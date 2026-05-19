export async function onRequestGet(context) {
  const { env } = context
  return Response.json({
    envKeys: Object.keys(env),
    hasAdminPassword: !!env.ADMIN_PASSWORD,
    hasGithubToken: !!env.GITHUB_TOKEN,
    hasGithubRepo: !!env.GITHUB_REPO,
  })
}
