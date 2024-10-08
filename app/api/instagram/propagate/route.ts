import { NextRequest, NextResponse } from 'next/server'
import { getInstagramPosts } from '../../../../lib/domain/instagram/service'
import { createInstagramPosts } from '../../../../lib/domain/contentful/management-service'

export const runtime = 'nodejs'
export const maxDuration = 60;


// curl -X GET https://beta.aptitud.se/api/instagram/propagate
export async function GET(request: NextRequest) {
  // @TODO add support for how many posts we should fetch (body data?)
  // @TODO add some kind of auth?
  // @TODO add better trigger? (webhook? instead of cron)

  try {
    // Fetch posts from Instagram API
    const instagramPosts = await getInstagramPosts()
    console.log('Fetched posts from Instagram:', instagramPosts)

    // Upload posts to Contentful
    const newPostCount = await createInstagramPosts(instagramPosts)

    return new NextResponse(JSON.stringify({ propagatedCount: newPostCount }), {
      status: 200,
    })
  } catch (error) {
    console.error('Error propagating posts:', error)
    return new NextResponse(JSON.stringify({ message: `Failed...` }), {
      status: 500,
    })
  }
}
