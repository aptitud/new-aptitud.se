import { AptigramCardProps, ContactCardProps, FellowCardProps, PostsCardProps } from './types'
import { getContacts, getFellows, getPosts } from './contentful/service'
import { getInstagramPosts } from './instagram/service'

export type CardFilter = 'about' | 'fellows' | 'instagram'
export const cardFilterMapping: {
  [key in CardFilter]: Exclude<keyof Awaited<ReturnType<typeof getAllCards>>, 'contact'>
} = {
  about: 'posts',
  fellows: 'fellows',
  instagram: 'instaPosts',
}

export const getAllCards = async (): Promise<{
  posts: PostsCardProps[]
  fellows: FellowCardProps[]
  instaPosts: AptigramCardProps[]
  contact: ContactCardProps
}> => {
  const fellows = await getFellows()
  const contacts = await getContacts()
  const posts = await getPosts()
  const insta = await getInstagramPosts()

  const sortedPosts = posts
    .sort((a, b) => {
      if (a.sticky != b.sticky) {
        return a.sticky ? -1 : 1
      }
      return Date.parse(b.ts) - Date.parse(a.ts)
    })
    .reverse()

  const fellowItems: FellowCardProps[] = fellows.map((fellow) => ({
    id: fellow.slug || fellow.id,
    title: fellow.name,
    type: 'fellow',
    text: fellow.description,
    image: fellow.image?.fields.file.url,
    colorCode: 'aptitud-petrol',
    socialLinks: fellow.services,
    video: fellow.video?.fields.file.url,
    showVideo: false,
  }))

  const postsItems: PostsCardProps[] = sortedPosts.map((post, index) => ({
    id: post.slug || post.id,
    title: post.title,
    type: 'post',
    text: post.description,
    image: post.image?.fields.file.url,
    colorCode: getColorBasedOnIndex(index),
    postContent: post.postContent,
    sticky: post.sticky,
  }))

  const contactItems: ContactCardProps[] = contacts.map((contact) => ({
    id: contact.id,
    title: contact.header,
    summaryTitle: contact.summaryHeader ? contact.summaryHeader : '',
    type: 'contact',
    text: contact.visitingAddress ? contact.visitingAddress : '',
    image: contact.image?.fields.file.url,
    colorCode: 'aptitud-blue_green',
  }))

  const instaPosts: AptigramCardProps[] = insta.map((post, index) => ({
    id: post.id,
    type: 'aptigram',
    text: post.caption || '',
    image: post.media_url ? post.media_url : null,
    thumbnail: post.thumbnail_url || '',
    permalink: post.permalink || '',
    colorCode: 'aptitud-purple',
  }))

  return {
    posts: postsItems,
    fellows: fellowItems,
    instaPosts: instaPosts,
    contact: contactItems[0],
  }
}

const standardColors = ['aptitud-green', 'aptitud-purple', 'aptitud-blue_dim']
const getColorBasedOnIndex = (index: number, overrideColors?: string[]): string => {
  return overrideColors ? overrideColors[index % overrideColors.length] : standardColors[index % standardColors.length]
}
