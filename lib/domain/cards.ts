import { AptigramProps, ContactCardProps, FellowCardProps, PostsCardProps } from '../../components/card/types'
import { getContacts, getFellows, getPosts } from './contentful/service'
import { getInstagramPosts } from './instagram/service'

export const getAllCards = async (): Promise<{
  postsItems: PostsCardProps[]
  fellowItems: FellowCardProps[]
  instaItems: AptigramProps[]
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
    id: fellow.id,
    title: fellow.name,
    type: 'fellow',
    text: fellow.description,
    image: fellow.image ? fellow.image?.fields.file.url : null,
    colorCode: 'aptitud-petrol',
    socialLinks: fellow.services,
    video: fellow.video ? fellow.video?.fields.file.url : null,
    showVideo: false,
  }))

  const postsItems: PostsCardProps[] = sortedPosts.map((post, index) => ({
    id: post.id,
    title: post.title,
    type: 'post',
    text: post.description,
    image: post.image ? post.image?.fields.file.url : null,
    colorCode: getColorBasedOnIndex(index),
    postContent: post.postContent ? post.postContent : '',
  }))

  const contactItems: ContactCardProps[] = contacts.map((contact) => ({
    id: contact.id,
    title: contact.header,
    summaryTitle: contact.summaryHeader ? contact.summaryHeader : '',
    type: 'contact',
    text: contact.visitingAddress ? contact.visitingAddress : '',
    image: contact.image ? contact.image?.fields.file.url : null,
    colorCode: 'aptitud-blue_green',
  }))

  const instaPosts: AptigramProps[] = insta.map((post: any) => ({
    id: post.id,
    title: post.permalink,
    type: 'aptigram',
    text: post.caption || '',
    image: post.media_url ? post.media_url : null,
    thumbnail: post.thumbnail_url || '',
    permalink: post.permalink || '',
    colorCode: 'aptitud-blue_green',
  }))

  return {
    postsItems,
    fellowItems,
    instaItems: instaPosts,
    contact: contactItems[0],
  }
}

const availableColors = ['aptitud-yellow', 'aptitud-green', 'aptitud-purple', 'aptitud-blue_dim']
const getColorBasedOnIndex = (index: number): string => {
  return availableColors[index % availableColors.length]
}
