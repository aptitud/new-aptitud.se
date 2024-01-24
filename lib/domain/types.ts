import { getFellows } from './contentful/service'

export type SocialLink = Awaited<Required<ReturnType<typeof getFellows>>>['0']['services'][0]

export type SharedCardProps = {
  id: string
  text: string
  colorCode: string
}

export type CardProps = FellowCardProps | PostsCardProps | AptigramCardProps | ContactCardProps

export type PostsCardProps = SharedCardProps & {
  type: 'post'
  title: string
  postContent: string
}

export type FellowCardProps = SharedCardProps & {
  type: 'fellow'
  title: string
  socialLinks: SocialLink[]
  video: string | null
  showVideo: boolean
  image: string | null
}

export type AptigramCardProps = SharedCardProps & {
  type: 'aptigram'
  thumbnail: string
  permalink: string
  image: string | null
}

export type ContactCardProps = SharedCardProps & {
  type: 'contact'
  title: string
  summaryTitle: string
  colorCode: string
  image: string | null
}
