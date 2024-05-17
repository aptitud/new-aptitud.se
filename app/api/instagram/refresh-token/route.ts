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
  return new Response(JSON.stringify(token))
}

async function refreshToken(token: string): Promise<{
  access_token: string
  token_type: string
  expires_in: number
}> {
  const response = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  )
  if (!response.ok) {
    throw new Error('Failed to refresh token')
  }

  return response.json()
}
