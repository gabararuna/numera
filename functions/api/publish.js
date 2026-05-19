export async function onRequestPost(context) {
  try {
    const { request, env } = context

    let body
    try {
      body = await request.json()
    } catch {
      return Response.json({ error: 'Body inválido' }, { status: 400 })
    }

    const { password, content } = body

    if (!env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Variável ADMIN_PASSWORD não configurada no Cloudflare' }, { status: 500 })
    }

    if (!password || password !== env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    if (!content || typeof content !== 'object') {
      return Response.json({ error: 'Conteúdo inválido' }, { status: 400 })
    }

    const repo = env.GITHUB_REPO
    const token = env.GITHUB_TOKEN
    const filePath = 'src/content.json'

    // Obter o SHA atual do arquivo no GitHub
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
      const errText = await metaRes.text()
      return Response.json({ error: `GitHub GET falhou (${metaRes.status}): ${errText.slice(0, 200)}` }, { status: 502 })
    }

    const meta = await metaRes.json()
    const sha = meta.sha

    // Codificar o conteúdo em base64 com suporte a unicode
    const jsonStr = JSON.stringify(content, null, 2)
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)))

    // Commitar o arquivo atualizado
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
      const errText = await putRes.text()
      return Response.json({ error: `GitHub PUT falhou (${putRes.status}): ${errText.slice(0, 200)}` }, { status: 502 })
    }

    return Response.json({ ok: true })

  } catch (err) {
    return Response.json({ error: `Exceção: ${err.message || String(err)}` }, { status: 500 })
  }
}
