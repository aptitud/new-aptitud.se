import { AssetProps } from 'contentful-management'
import { client } from './management-client'
import { InstagramPost } from '../instagram/service'

export const createInstagramPosts = async (posts: InstagramPost[]) => {
  // @TODO add some kind of logic to not upload already existing posts...

  // @TODO stop doing only one (temp for testing..)
  for (const post of posts.slice(0, 1)) {

    const imageAsset = await createInstagramImageAsset(post.id, post.media_url)
    console.log('imageAsset: ', imageAsset);
  //   await client.asset.processForAllLocales(
  //     {},
  //     {
  //       ...imageAsset,
  //     }
  //   )

  //   await createAptigramEntry({
  //     id: post.id,
  //     caption: post.caption,
  //     imageAsset,
  //     permaLink: post.permalink,
  //   })
  }
}

export const createInstagramImageAsset = async (postId: string, imageUrl: string) => {
  try {
    const asset = await client.asset.create(
      {
        // assetId: postId,
      },
      {
        fields: {
          title: {
            sv: postId,
          },
          file: {
            sv: {
              contentType: 'image/jpeg',
              fileName: postId,
              upload: imageUrl,
            },
          },
        },
      },
    )

    // downlaods the mediaUrl from IG to CF
    const processedAsset = await client.asset.processForAllLocales({}, asset)
    // @TODO Publish does not work
    console.log('asset after processing: ', asset)
    await client.asset.publish({ assetId: asset.sys.id }, processedAsset)
    console.log('DID ACTUALLY PUBLISH!!!!!!!!')

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
    const entry = await client.entry.create(
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

    // @TODO Publish does not work
    await client.entry.publish({ entryId: entry.sys.id }, entry)
  } catch (error) {
    console.error('Error creating Aptigram entry:', error)
    throw error
  }
}
