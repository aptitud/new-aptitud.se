import { createClient } from 'contentful'
import { TypeFellowFields } from './types'

const { CONTENTFUL_ACCESS_TOKEN } = process.env

const client = createClient({
  space: 'kqhdnxbobtly',
  accessToken: CONTENTFUL_ACCESS_TOKEN!,
})

export const getFellows = async () => {
  const a = await client.getEntries<TypeFellowFields>({
    content_type: 'fellow',
  })

  return a.items.map((x) => x.fields)
}
