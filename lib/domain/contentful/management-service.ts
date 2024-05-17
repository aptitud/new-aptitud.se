import { AssetProps, EnvironmentProps } from 'contentful-management'
import { client } from './management-client'

const { CONTENTFUL_SPACE_ID } = process.env
if (!CONTENTFUL_SPACE_ID) throw new Error('CONTENTFUL_SPACE_ID is not set')

const getContentfulEnvironment = async () => {
  const environment = await client.environment.get({
    spaceId: CONTENTFUL_SPACE_ID,
    environmentId: 'master',
  })

  console.log('Contentful environment:', environment)
  return environment
}

export const createInstagramPosts = async (posts: any[]) => {
  const environment = await getContentfulEnvironment()

  for (const post of posts.slice(0, 1)) {
    const imageAsset = await createInstagramImageAsset(environment, post.id, post.imageUrl)
    await createAptigramEntry(environment, {
      id: post.id,
      caption: post.caption,
      imageAsset,
      permaLink: post.permalink,
    })
  }
}

export const createInstagramImageAsset = async (environment: EnvironmentProps, postId: string, imageUrl: string) => {
  try {
    const asset = await client.asset.create(
      {
        spaceId: environment.sys.space.sys.id,
        environmentId: environment.sys.id,
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
export const createAptigramEntry = async (environment: EnvironmentProps, data: AptigramData) => {
  try {
    await client.entry.create(
      {
        spaceId: environment.sys.space.sys.id,
        environmentId: environment.sys.id,
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
