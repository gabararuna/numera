export async function onRequestPost(context) {
  return Response.json({ ok: true, test: 'function reached' })
}
