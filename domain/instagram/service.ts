
const { INSTAGRAM_ACCESS_TOKEN } = process.env


export const getInstagramPosts = async() => {

  const res = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}&limit=13`)
  const posts = await res.json()
  return posts.data.reverse();
}
