import { createClient } from 'contentful'
import { TypeFellowFields, TypePostFields, TypeContactFields } from './types'

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
      fields: { name, description, image, phone, services, video },
    } = fellow
    return {
      name,
      description,
      image,
      video,
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
  return res.items.map((post) => {
    return { ...post.fields, ts: post.sys.createdAt }
  })
}
export const getContacts = async () => {
  const res = await client.getEntries<TypeContactFields>({
    content_type: 'contact',
  })

  return res.items.map((contact) => {
    return { ...contact.fields }
  })
}
