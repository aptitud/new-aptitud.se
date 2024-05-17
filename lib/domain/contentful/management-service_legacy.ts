import { AssetProps } from 'contentful-management'
import { contentfulEnvironment, createContentfulEnvironment } from './management-client'

export const createInstagramPosts = async (posts: any[]) => {
  await createContentfulEnvironment()

  for (const post of posts.slice(0, 1)) {
    const imageAsset = await createInstagramImageAsset(post.id, post.imageUrl)

    // await createAptigramEntry({
    //   id: post.id,
    //   caption: post.caption,
    //   imageAsset,
    //   permaLink: post.permalink,
    // })
  }
}

export const createInstagramImageAsset = async (postId: string, imageUrl: string) => {
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
