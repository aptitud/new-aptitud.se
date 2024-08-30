import { NextRequest, NextResponse } from 'next/server'
import { getInstagramPosts } from '../../../../lib/domain/instagram/service'
import { createInstagramPosts } from '../../../../lib/domain/contentful/management-service'

export const runtime = 'nodejs'

// curl -X POST https://beta.aptitud.se/api/instagram/propagate
export async function POST(request: NextRequest) {
  // @TODO add some kind of auth?
  // @TODO add some kind of trigger? (cron?)

  try {
    // Fetch posts from Instagram API
    const instagramPosts = await getInstagramPosts()

    // Upload posts to Contentful
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
