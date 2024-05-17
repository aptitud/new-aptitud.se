import { getInstagramPosts } from '../../../../lib/domain/instagram/service'

export const runtime = 'nodejs'

export async function POST(request: Request, response: Response) {
  console.log(request)
  try {
    // Fetch posts from Instagram API
    const instagramPosts = await getInstagramPosts()

    return { message: `Posts propagated successfully, ${instagramPosts.length}`, status: 200 }
  } catch (error) {
    console.error('Error propagating posts:', error)
    return { message: 'Failed to propagate posts', status: 500 }
  }
}
