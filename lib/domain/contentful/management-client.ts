import { createClient } from 'contentful-management'

const { CONTENTFUL_MANAGEMENT_API_TOKEN } = process.env
if (!CONTENTFUL_MANAGEMENT_API_TOKEN) throw new Error('CONTENTFUL_MANAGEMENT_API_TOKEN is not set')

export const client = createClient(
  {
    // This is the access token for this space. Normally you get the token in the Contentful web app
    accessToken: CONTENTFUL_MANAGEMENT_API_TOKEN,
    throttle: 'auto',
  },
  { type: 'plain' }
)