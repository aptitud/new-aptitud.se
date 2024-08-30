import { getFellows } from './contentful/service'

export type SocialLink = Awaited<Required<ReturnType<typeof getFellows>>>['0']['services'][0]

export type SharedCardProps = {
  id: string
  colorCode: string
}

export type CardProps = FellowCardProps | PostsCardProps | AptigramCardProps | ContactCardProps

export type PostsCardProps = SharedCardProps & {
  type: 'post'
  title: string
  text: string
  postContent: string
  sticky?: boolean
  image?: string
}

export type FellowCardProps = SharedCardProps & {
  type: 'fellow'
  title: string
  text: string
  socialLinks: SocialLink[]
  video?: string
  showVideo: boolean
  image: string
}

export type AptigramCardProps = SharedCardProps & {
  type: 'aptigram'
  permalink: string
  text: string
  image: string
}

export type ContactCardProps = SharedCardProps & {
  type: 'contact'
  title: string
  text: string
  summaryTitle: string
  colorCode: string
  image?: string
}
