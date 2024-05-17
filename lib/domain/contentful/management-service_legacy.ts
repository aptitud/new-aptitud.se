import { AssetProps } from 'contentful-management'
import { contentfulEnvironment, createContentfulEnvironment } from './management-client'
import { InstagramPost } from '../instagram/service'

export const createInstagramPosts = async (posts: InstagramPost[]) => {
  await createContentfulEnvironment()

  for (const post of posts.slice(0, 1)) {
    const imageAsset = await createInstagramImageAsset(post.id, post.media_url)

    // await createAptigramEntry({
    //   id: post.id,
    //   caption: post.caption,
    //   imageAsset,
    //   permaLink: post.permalink,
    // })
  }
}

export const createInstagramImageAsset = async (postId: string, imageUrl: string) => {
  console.log('trying to upload asset with url: ', imageUrl)
  try {
    const asset = await contentfulEnvironment
      .createAsset({
        fields: {
          title: {
            sv: postId,
          },
          file: {
            sv: {
              contentType: 'image/jpeg',
              fileName: imageUrl,
              upload: imageUrl,
            },
          },
        },
      })
      .then((asset) => asset.processForAllLocales())

    return asset
  } catch (error) {
    console.error('Error creating Instagram image asset:', error)
    throw error
  }
}
