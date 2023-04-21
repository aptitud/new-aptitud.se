import { createClient } from 'contentful'
import { TypeFellowFields, TypePostFields, TypeServiceFields } from './types'

const { CONTENTFUL_ACCESS_TOKEN } = process.env

const client = createClient({
  space: 'kqhdnxbobtly',
  accessToken: CONTENTFUL_ACCESS_TOKEN!,
})

export const getFellows = async () => {
  const res = await client.getEntries<TypeFellowFields>({
    content_type: 'fellow',
  })
  return res.items.map((fellow) => {
    const {
      fields: { name, description, image, phone, services },
    } = fellow

    return {
      name,
      description,
      image,
      phone,
      services:
        services?.map((x) => ({
          name: x.fields.name,
          url: x.fields.url,
        })) ?? [],
    }
  })
}

export const getPosts = async () => {
  const res = await client.getEntries<TypePostFields>({
    content_type: 'post',
  })

  return res.items.map((fellow) => fellow.fields)
}
