export async function onRequestPost(context) {
  try {
    const { request, env } = context

    let body
    try {
      body = await request.json()
    } catch (e) {
      return Response.json({ error: `Body inválido: ${e.message}` }, { status: 400 })
    }

    const { password, content } = body

    if (!env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Variável ADMIN_PASSWORD não configurada' }, { status: 500 })
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

    // 1. Buscar SHA atual do arquivo
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
      return Response.json(
        { error: `GitHub GET falhou (${metaRes.status}): ${errText.slice(0, 300)}` },
        { status: 500 }
      )
    }

    const meta = await metaRes.json()
    const sha = meta.sha

    // 2. Codificar conteúdo em base64
    const jsonStr = JSON.stringify(content, null, 2)
    const bytes = new TextEncoder().encode(jsonStr)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    const encoded = btoa(binary)

    // 3. Commitar o arquivo
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
      return Response.json(
        { error: `GitHub PUT falhou (${putRes.status}): ${errText.slice(0, 300)}` },
        { status: 500 }
      )
    }

    return Response.json({ ok: true })

  } catch (err) {
    return Response.json({ error: `Exceção: ${err.message}` }, { status: 500 })
  }
}
