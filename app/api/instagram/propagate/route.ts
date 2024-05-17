import { NextRequest, NextResponse } from 'next/server'
import { getInstagramPosts } from '../../../../lib/domain/instagram/service'
import { createInstagramPosts } from '../../../../lib/domain/contentful/management-service'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  console.log(request)
  try {
    // Fetch posts from Instagram API
    const instagramPosts = await getInstagramPosts()

    await createInstagramPosts(instagramPosts)

    return new NextResponse(JSON.stringify({ posts: instagramPosts }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error propagating posts:', error)
    return new NextResponse(JSON.stringify({ message: `Failed...` }), {
      status: 500,
    })
  }
}
