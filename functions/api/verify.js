export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 })
  }

  const { password } = body

  if (!password || password !== env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  return Response.json({ ok: true })
}
