// check for GitHub user
// running on vercel edge

export const config = {
  runtime: 'edge'
}

export default async function (req, res) {
  let endpoint = 'https://api.github.com/user'
  let token = req.headers.get('Authorization')

  if (!token) {
    return _res.json({
      message: 'no_token'
    }, 400)
  }

  let user = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Authorization': token,
    }
  })

  if (user.status !== 200) {
    return _res.json({
      message: 'github_error',
      detail: user.statusText
    }, user.status)
  }

  let user_json = await user.json()

  return _res.json(user_json)
}