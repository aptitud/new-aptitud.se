import { AssetProps } from 'contentful-management'
import { client } from './management-client'

export const createInstagramPosts = async (posts: any[]) => {
  for (const post of posts.slice(0, 1)) {
    const imageAsset = await createInstagramImageAsset(post.id, post.imageUrl)
    await createAptigramEntry({
      id: post.id,
      caption: post.caption,
      imageAsset,
      permaLink: post.permalink,
    })
  }
}

export const createInstagramImageAsset = async (postId: string, imageUrl: string) => {
  try {
    const asset = await client.asset.create(
      {},
      {
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
      }
    )

    return asset
  } catch (error) {
    console.error('Error creating Instagram image asset:', error)
    throw error
  }
}

type AptigramData = {
  id: string
  caption: string
  imageAsset: AssetProps
  permaLink: string
}
export const createAptigramEntry = async (data: AptigramData) => {
  try {
    await client.entry.create(
      {
        contentTypeId: 'aptigram',
      },
      {
        fields: {
          id: {
            sv: data.id,
          },
          caption: {
            sv: data.caption,
          },
          image: {
            sv: {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: data.imageAsset.sys.id,
              },
            },
          },
        },
      }
    )
  } catch (error) {
    console.error('Error creating Aptigram entry:', error)
    throw error
  }
}
