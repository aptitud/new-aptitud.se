import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }
  if (!process.env.INSTAGRAM_ACCESS_TOKEN) {
    return new Response('No access token found')
  }

  const token = await refreshToken(process.env.INSTAGRAM_ACCESS_TOKEN!)
  await notifySlack(token)
  return new Response(JSON.stringify(token))
}

type InstagramTokenRefreshResponse = {
  access_token: string
  token_type: string
  expires_in: number
}
async function refreshToken(token: string): Promise<InstagramTokenRefreshResponse> {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )
  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  return response.json()
}

const notifySlack = async (response: InstagramTokenRefreshResponse) => {
  const slackWebhook = process.env.SLACK_WEBHOOK
  if (!slackWebhook) {
    return
  }

  // get date from expires_in seconds
  const expiryDate = new Date(Date.now() + response.expires_in * 1000)

  const expiryDateString = expiryDate.toISOString()

  const message = {
    text: `Instagram token refreshed. Expires at ${expiryDateString}`,
  }

  await fetch(slackWebhook, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}
