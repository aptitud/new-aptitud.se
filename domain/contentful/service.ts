import { createClient } from 'contentful'
import { TypeFellowFields, TypePostFields } from './types'

const { CONTENTFUL_ACCESS_TOKEN } = process.env

const client = createClient({
    space: 'kqhdnxbobtly',
    accessToken: CONTENTFUL_ACCESS_TOKEN!,
})

export const getFellows = async () => {
    const res = await client.getEntries<TypeFellowFields>({
        content_type: 'fellow',
    })

    return res.items.map((fellow) => fellow.fields)
}

export const getPosts = async () => {
    const res = await client.getEntries<TypePostFields>({
        content_type: 'post',
    })

    return res.items.map((fellow) => fellow.fields)
}
