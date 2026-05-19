export async function onRequestPost(context) {
  try {
    const { request, env } = context

    let body
    try {
      body = await request.json()
    } catch (e) {
      return Response.json({ error: `Body parse falhou: ${e.message}` }, { status: 400 })
    }

    const { password, content } = body

    if (!env.ADMIN_PASSWORD || password !== env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Senha incorreta' }, { status: 401 })
    }

    if (!content || typeof content !== 'object') {
      return Response.json({ error: 'Conteúdo inválido' }, { status: 400 })
    }

    // Testar encoding sem chamar GitHub
    const jsonStr = JSON.stringify(content, null, 2)
    const bytes = new TextEncoder().encode(jsonStr)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    const encoded = btoa(binary)

    return Response.json({
      step: 'encoding_ok',
      jsonLength: jsonStr.length,
      encodedLength: encoded.length,
    })

  } catch (err) {
    return Response.json({ error: `Exceção: ${err.message}` }, { status: 500 })
  }
}
