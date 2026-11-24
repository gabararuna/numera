"""
Parallel deterministic frame renderer & FFmpeg muxer for Numera promotional videos.
Renders 9:16 (59s @ 30fps) and 4:5 (29s @ 30fps) natively via Playwright Chromium.
"""

import argparse
import multiprocessing as mp
import pathlib
import shutil
import subprocess
import time
from playwright.sync_api import sync_playwright

from audio_synth import generate_audio

FFMPEG = "/Users/gabrielararuna/.hermes/tools/ffmpeg-9.0.1-darwin-arm64/ffmpeg"
ROOT = pathlib.Path(__file__).resolve().parents[2]
VIDEO_DIR = pathlib.Path(__file__).resolve().parent
EXPORTS_DIR = ROOT / "exports" / "videos"

CONFIGS = {
    "story": {
        "html": VIDEO_DIR / "story-9x16.html",
        "width": 1080,
        "height": 1920,
        "fps": 30,
        "duration": 59.0,
        "bpm": 110.0,
        "cuts": [5.4, 11.4, 21.9, 28.4, 35.9, 38.1, 42.4, 46.9, 51.4],
        "light_window": (36.0, 51.6),
        "out": EXPORTS_DIR / "numera-promo-story-9x16-59s.mp4",
    },
    "feed": {
        "html": VIDEO_DIR / "feed-4x5.html",
        "width": 1080,
        "height": 1350,
        "fps": 30,
        "duration": 29.0,
        "bpm": 116.0,
        "cuts": [3.7, 8.2, 14.4, 22.9],
        "light_window": (14.5, 23.1),
        "out": EXPORTS_DIR / "numera-promo-feed-4x5-29s.mp4",
    },
}


def render_chunk(args):
    variant, start_f, end_f, frames_dir = args
    cfg = CONFIGS[variant]
    total_frames = int(round(cfg["duration"] * cfg["fps"]))

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(
            viewport={"width": cfg["width"], "height": cfg["height"]},
            device_scale_factor=1,
        )
        page.goto(cfg["html"].resolve().as_uri(), wait_until="load")
        page.evaluate("""async () => {
            await Promise.all([
                document.fonts.load('300 24px Figtree', 'Aa09.'),
                document.fonts.load('400 24px Figtree', 'Aa09.'),
                document.fonts.load('500 24px Figtree', 'Aa09.'),
                document.fonts.load('600 48px Figtree', 'Aa09.'),
                document.fonts.load('400 18px "DM Mono"', 'gruponumera.com')
            ]);
            await document.fonts.ready;
        }""")
        page.wait_for_function(
            "() => document.fonts.check('600 48px Figtree', 'Numera') && document.fonts.check('400 18px \"DM Mono\"', 'gruponumera.com')"
        )
        page.wait_for_function(
            "() => Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)"
        )

        for frame in range(start_f, end_f):
            page.evaluate(f"window.renderFrame({frame}, {total_frames}, {cfg['fps']})")
            out_png = frames_dir / f"frame_{frame:05d}.png"
            page.screenshot(path=str(out_png), animations="disabled", omit_background=False)

        browser.close()
    return end_f - start_f


def build_video(variant: str, workers: int = 4) -> None:
    cfg = CONFIGS[variant]
    total_frames = int(round(cfg["duration"] * cfg["fps"]))
    frames_dir = pathlib.Path(f"/tmp/numera-frames-{variant}")
    audio_wav = pathlib.Path(f"/tmp/numera-audio-{variant}.wav")

    if frames_dir.exists():
        shutil.rmtree(frames_dir)
    frames_dir.mkdir(parents=True, exist_ok=True)
    EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

    t0 = time.time()
    print(f"[{variant}] Synthesizing {cfg['duration']:.1f}s soundtrack...")
    generate_audio(
        str(audio_wav),
        duration_sec=cfg["duration"],
        bpm=cfg["bpm"],
        cut_times=cfg["cuts"],
        light_window=cfg["light_window"],
        seed=42 if variant == "story" else 99,
    )
    print(f"[{variant}] Audio generated in {time.time() - t0:.2f}s -> {audio_wav}")

    t1 = time.time()
    chunk_size = (total_frames + workers - 1) // workers
    tasks = []
    for i in range(workers):
        s = i * chunk_size
        e = min(total_frames, s + chunk_size)
        if s < e:
            tasks.append((variant, s, e, frames_dir))

    print(f"[{variant}] Rendering {total_frames} frames ({cfg['width']}x{cfg['height']} @ {cfg['fps']}fps) across {len(tasks)} workers...")
    with mp.Pool(processes=len(tasks)) as pool:
        pool.map(render_chunk, tasks)
    print(f"[{variant}] Frames rendered in {time.time() - t1:.2f}s")

    t2 = time.time()
    cmd = [
        FFMPEG,
        "-y",
        "-framerate", str(cfg["fps"]),
        "-i", str(frames_dir / "frame_%05d.png"),
        "-i", str(audio_wav),
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "17",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-ar", "48000",
        "-movflags", "+faststart",
        "-t", f"{cfg['duration']:.2f}",
        str(cfg["out"]),
    ]
    subprocess.run(cmd, check=True)
    print(f"[{variant}] Encoded {cfg['out']} in {time.time() - t2:.2f}s")

    shutil.rmtree(frames_dir, ignore_errors=True)
    audio_wav.unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", choices=["story", "feed"], default=None)
    parser.add_argument("--workers", type=int, default=4)
    args = parser.parse_args()

    targets = [args.only] if args.only else ["feed", "story"]
    for v in targets:
        build_video(v, workers=args.workers)


if __name__ == "__main__":
    main()
