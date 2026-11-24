"""
Procedural architectural soundtrack & synced sound design for Numera promo videos.
Pure Python standard library (48kHz stereo 16-bit PCM WAV, wavetable-accelerated).
"""

import array
import math
import random
import wave

SR = 48000
TWO_PI = 2.0 * math.pi
TABLE_N = 4096
SIN_TAB = [math.sin(TWO_PI * i / TABLE_N) for i in range(TABLE_N)]


def fast_sin(phase_cycles: float) -> float:
    idx = int((phase_cycles % 1.0) * TABLE_N) & (TABLE_N - 1)
    return SIN_TAB[idx]


def warm_pad_sample(phase_cycles: float) -> float:
    # Soft fundamental + gentle 2nd harmonic + subtle 3rd
    idx1 = int((phase_cycles % 1.0) * TABLE_N) & (TABLE_N - 1)
    idx2 = (idx1 << 1) & (TABLE_N - 1)
    idx3 = (idx1 * 3) & (TABLE_N - 1)
    return SIN_TAB[idx1] * 0.78 + SIN_TAB[idx2] * 0.16 + SIN_TAB[idx3] * 0.06


def soft_clip(x: float) -> float:
    return math.tanh(x * 1.15) * 0.84


def generate_audio(
    out_wav: str,
    duration_sec: float,
    bpm: float,
    cut_times: list[float],
    light_window: tuple[float, float],
    seed: int = 42,
) -> None:
    total_samples = int(round(duration_sec * SR))
    rng = random.Random(seed)

    # Warm minor-ninth architectural chord progression: Dm9 -> Fmaj7 -> Cmaj9 -> Am7
    chords = [
        [146.83, 220.00, 261.63, 329.63],  # Dm9 (D3, A3, C4, E4)
        [174.61, 220.00, 261.63, 329.63],  # Fmaj7 (F3, A3, C4, E4)
        [130.81, 196.00, 246.94, 293.66],  # Cmaj9 (C3, G3, B3, D4)
        [110.00, 164.81, 220.00, 261.63],  # Am7 (A2, E3, A3, C4)
    ]
    roots = [73.42, 87.31, 65.41, 55.00]  # D2, F2, C2, A1
    arp_notes = [587.33, 659.25, 523.25, 440.00, 659.25, 783.99, 523.25, 440.00]

    bar_sec = (60.0 / bpm) * 4.0
    beat_sec = 60.0 / bpm
    eighth_sec = beat_sec * 0.5

    # Precompute stereo float buffers
    buf_l = [0.0] * total_samples
    buf_r = [0.0] * total_samples

    # 1. Warm harmonic pads + bass foundation
    pad_phases = [0.0, 0.0, 0.0, 0.0]
    bass_phase = 0.0
    light_start, light_end = light_window

    inv_sr = 1.0 / SR
    for i in range(total_samples):
        t = i * inv_sr
        bar_idx = int(t / bar_sec)
        chord = chords[bar_idx % len(chords)]
        root_f = roots[bar_idx % len(roots)]

        # Smooth chord crossfade envelope inside each bar
        bar_pos = (t % bar_sec) / bar_sec
        chord_env = 1.0
        if bar_pos < 0.04:
            chord_env = 0.72 + 0.28 * (bar_pos / 0.04)

        # Gentle breathing LFO
        breath = 0.85 + 0.15 * fast_sin(t * 0.22)

        # Brightness boost during Algodao Cru (light theme) ecosystem chapter
        in_light = 0.0
        if light_start <= t <= light_end:
            fade_in = min(1.0, (t - light_start) / 0.6)
            fade_out = min(1.0, (light_end - t) / 0.6)
            in_light = min(fade_in, fade_out)

        pad_l = 0.0
        pad_r = 0.0
        for v_idx, freq in enumerate(chord):
            # Subtle stereo detune
            detune = (v_idx - 1.5) * 0.0012
            pad_phases[v_idx] += freq * inv_sr
            s = warm_pad_sample(pad_phases[v_idx])
            s_d = warm_pad_sample(pad_phases[v_idx] * (1.0 + detune))
            pan = 0.25 + 0.5 * (v_idx / 3.0)
            pad_l += s * (1.0 - pan * 0.4)
            pad_r += s_d * (0.6 + pan * 0.4)

        pad_gain = 0.11 * chord_env * breath * (1.0 - 0.15 * in_light)
        l_val = pad_l * pad_gain
        r_val = pad_r * pad_gain

        # Sub-bass pulse synced to beat
        bass_phase += root_f * inv_sr
        beat_pos = (t % beat_sec) / beat_sec
        sub_env = math.exp(-beat_pos * 3.8)
        sub_sig = fast_sin(bass_phase) * 0.26 * (0.35 + 0.65 * sub_env)
        l_val += sub_sig
        r_val += sub_sig

        buf_l[i] = l_val
        buf_r[i] = r_val

    # 2. Crisp architectural pulse ticks (quarter / eighth notes, ultra-clean)
    step = 0
    t_step = 0.0
    while t_step < duration_sec - 0.2:
        start_i = int(t_step * SR)
        is_downbeat = (step % 8) == 0
        is_beat = (step % 2) == 0
        in_light = light_start <= t_step <= light_end

        if is_beat:
            # Soft low thump on beat 1 & 3, subtle rim tick on 2 & 4
            if step % 4 == 0:
                tick_len = int(0.09 * SR)
                for j in range(min(tick_len, total_samples - start_i)):
                    tau = j * inv_sr
                    env = math.exp(-tau * 34.0)
                    f = 95.0 - 45.0 * min(1.0, tau * 14.0)
                    sig = fast_sin(f * tau) * env * (0.22 if is_downbeat else 0.14)
                    buf_l[start_i + j] += sig
                    buf_r[start_i + j] += sig
            else:
                tick_len = int(0.025 * SR)
                for j in range(min(tick_len, total_samples - start_i)):
                    tau = j * inv_sr
                    env = math.exp(-tau * 180.0)
                    sig = (fast_sin(1680.0 * tau) * 0.6 + (rng.random() * 2.0 - 1.0) * 0.4) * env * 0.045
                    buf_l[start_i + j] += sig * 0.9
                    buf_r[start_i + j] += sig * 1.1

        # Crystalline minimal marimba/bell arpeggio during Ecosystem section
        if in_light or (t_step > 5.0 and step % 2 == 0):
            arp_amp = 0.11 if in_light else 0.045
            note_f = arp_notes[step % len(arp_notes)]
            note_len = int(0.32 * SR)
            pan = 0.35 if (step % 2 == 0) else 0.65
            for j in range(min(note_len, total_samples - start_i)):
                tau = j * inv_sr
                env = math.exp(-tau * 9.5) * min(1.0, tau / 0.004)
                sig = (fast_sin(note_f * tau) * 0.8 + fast_sin(note_f * 2.0 * tau) * 0.2) * env * arp_amp
                buf_l[start_i + j] += sig * (1.2 - pan * 0.4)
                buf_r[start_i + j] += sig * (0.8 + pan * 0.4)

        step += 1
        t_step = step * eighth_sec

    # 3. Micro transition sweeps / UI clicks anchored at exact scene cuts
    for idx, ct in enumerate(cut_times):
        center = int(ct * SR)
        # Pre-cut soft air swell (180ms)
        swell_len = int(0.18 * SR)
        s0 = max(0, center - swell_len)
        prev_noise = 0.0
        for i in range(s0, min(total_samples, center + int(0.04 * SR))):
            rel = (i - s0) / float(swell_len)
            env = (rel * rel) if rel <= 1.0 else math.exp(-(rel - 1.0) * 18.0)
            n = rng.random() * 2.0 - 1.0
            prev_noise = prev_noise * 0.82 + n * 0.18
            sig = prev_noise * env * 0.09
            buf_l[i] += sig
            buf_r[i] += sig

        # Clean tactile harmonic chime at cut point
        chime_f = 523.25 if idx % 2 == 0 else 659.25
        chime_len = int(0.14 * SR)
        for j in range(min(chime_len, max(0, total_samples - center))):
            tau = j * inv_sr
            env = math.exp(-tau * 26.0) * min(1.0, tau / 0.003)
            sig = fast_sin(chime_f * tau) * env * 0.075
            buf_l[center + j] += sig
            buf_r[center + j] += sig

    # 4. Master fade-in / fade-out + soft limiting -> 16-bit interleaved PCM
    fade_in_n = int(0.35 * SR)
    fade_out_n = int(1.25 * SR)
    pcm = array.array("h")
    append = pcm.append

    for i in range(total_samples):
        gain = 1.0
        if i < fade_in_n:
            gain = i / float(fade_in_n)
        elif i >= total_samples - fade_out_n:
            gain = (total_samples - 1 - i) / float(fade_out_n)
            if gain < 0.0:
                gain = 0.0
        l_out = int(soft_clip(buf_l[i] * gain) * 32000)
        r_out = int(soft_clip(buf_r[i] * gain) * 32000)
        append(l_out)
        append(r_out)

    with wave.open(out_wav, "wb") as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())
