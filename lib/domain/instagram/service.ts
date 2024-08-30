import { REVALIDATE_IN_SECONDS, REVALIDATE_TAGS } from '../../consants'

const { INSTAGRAM_ACCESS_TOKEN } = process.env

export type InstagramPost = {
  id: string
  caption: string
  media_url: string
  thumbnail_url: string
  permalink: string
  timestamp: string
}

export const getInstagramPosts = async (): Promise<InstagramPost[]> => {
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=16`,
      { next: { revalidate: REVALIDATE_IN_SECONDS, tags: [REVALIDATE_TAGS.instagram] } }
    )
    const posts = await res.json()

    if(!res.ok) {
      console.error('Failed to fetch Instagram posts:', res.statusText)
    }
    return posts.data;
  } catch (error) {
    throw error;
  }
}
