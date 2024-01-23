import { getFellows } from './contentful/service'

export type SocialLink = Awaited<Required<ReturnType<typeof getFellows>>>['0']['services'][0]

export type SharedCardProps = {
  id: string
  title: string
  text: string
  image: string | null
  colorCode: string
}

export type CardProps = FellowCardProps | PostsCardProps | AptigramCardProps | ContactCardProps

export type PostsCardProps = SharedCardProps & {
  type: 'post'
  postContent: string
}

export type FellowCardProps = SharedCardProps & {
  type: 'fellow'
  socialLinks: SocialLink[]
  video: string | null
  showVideo: boolean
}

export type AptigramCardProps = SharedCardProps & {
  type: 'aptigram'
  thumbnail: string
  permalink: string
}

export type ContactCardProps = SharedCardProps & {
  type: 'contact'
  summaryTitle: string
  colorCode: string
}
