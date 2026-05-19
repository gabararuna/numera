export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 })
  }

  const { password, content } = body

  if (!password || password !== env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  if (!content || typeof content !== 'object') {
    return Response.json({ error: 'Conteúdo inválido' }, { status: 400 })
  }

  const repo = env.GITHUB_REPO
  const token = env.GITHUB_TOKEN
  const filePath = 'src/content.json'

  try {
    // 1. Obter o SHA atual do arquivo no GitHub
    const metaRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'numera-admin',
          Accept: 'application/vnd.github+json',
        },
      }
    )

    if (!metaRes.ok) {
      const err = await metaRes.json()
      return Response.json({ error: `GitHub API: ${err.message}` }, { status: 502 })
    }

    const meta = await metaRes.json()
    const sha = meta.sha

    // 2. Codificar o novo conteúdo em base64 (suporte a unicode)
    const jsonStr = JSON.stringify(content, null, 2)
    const bytes = new TextEncoder().encode(jsonStr)
    let binary = ''
    for (const byte of bytes) binary += String.fromCharCode(byte)
    const encoded = btoa(binary)

    // 3. Commitar o arquivo atualizado
    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'numera-admin',
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          message: 'chore: update content via admin',
          content: encoded,
          sha,
        }),
      }
    )

    if (!putRes.ok) {
      const err = await putRes.json()
      return Response.json({ error: `GitHub commit: ${err.message}` }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    return Response.json({ error: err.message || 'Erro interno' }, { status: 500 })
  }
}
