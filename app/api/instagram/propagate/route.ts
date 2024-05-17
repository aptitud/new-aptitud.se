import { NextRequest, NextResponse } from 'next/server'
import { getInstagramPosts } from '../../../../lib/domain/instagram/service'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  console.log(request)
  try {
    // Fetch posts from Instagram API
    const instagramPosts = await getInstagramPosts()

    return new NextResponse(JSON.stringify({ message: `Posts propagated successfully, ${instagramPosts.length}` }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error propagating posts:', error)
    return new NextResponse(JSON.stringify({ message: `Failed...` }), {
      status: 500,
    })
  }
}
