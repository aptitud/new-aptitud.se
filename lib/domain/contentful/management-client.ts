import contentful from 'contentful-management'

const { CONTENTFUL_MANAGEMENT_API_TOKEN } = process.env
if (!CONTENTFUL_MANAGEMENT_API_TOKEN) throw new Error('CONTENTFUL_MANAGEMENT_API_TOKEN is not set')

const { CONTENTFUL_SPACE_ID } = process.env
if (!CONTENTFUL_SPACE_ID) throw new Error('CONTENTFUL_SPACE_ID is not set')

export const client = contentful.createClient(
  {
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: CONTENTFUL_MANAGEMENT_API_TOKEN,
    space: CONTENTFUL_SPACE_ID,
    throttle: 'auto',
  },
  { type: 'plain' }
)
