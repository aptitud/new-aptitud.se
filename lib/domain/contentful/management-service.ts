import { AssetProps } from 'contentful-management'
import { client } from './management-client'
import { InstagramPost } from '../instagram/service'

export const createInstagramPosts = async (posts: InstagramPost[]) => {
  for (const post of posts.slice(0, 1)) {
    const imageAsset = await createInstagramImageAsset(post.id, post.)

    // THIS IS NOT WORKING !!! API DOCS ARE BAAAAD!
    await client.asset.processForAllLocales(
      {},
      {
        ...imageAsset,
      }
    )

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
    const asset = await client.asset.createWithId(
      {
        assetId: '123',
      },
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

    await client.asset.processForAllLocales({}, asset)
    await client.asset.publish({'assetId': asset.sys.id}, asset)

    //.then((asset) => asset.processForAllLocales())

    // process asset

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
