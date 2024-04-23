import { REVALIDATE_IN_SECONDS, REVALIDATE_TAGS } from '../../consants'

const { INSTAGRAM_ACCESS_TOKEN } = process.env

export const getInstagramPosts = async (): Promise<any[]> => {
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=16`,
      { next: { revalidate: REVALIDATE_IN_SECONDS, tags: [REVALIDATE_TAGS.instagram] } }
    )
    const posts = await res.json()
    return posts.data.reverse()
  } catch (error) {
    return []
  }
}
