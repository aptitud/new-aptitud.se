
import { getFellows } from '../../domain/contentful/service'
import {ContactCardProps}  from './Contact'

export type SocialLink = Awaited<
  Required<ReturnType<typeof getFellows>>
>['0']['services'][0]

export type SharedCardProps = {
  title: string
  text: string
  image: string | null
  colorCode: string
  onKeyDown: any
}
export type CardProps = FellowCardProps | PostsCardProps | AptigramProps

export type PostsCardProps = SharedCardProps & {
  type: 'post'
  postContent: string,
}

export type FellowCardProps = SharedCardProps & {
  type: 'fellow'
  //TODO: get rid of undefined values...
  socialLinks: SocialLink[]
  video: string | null
  showVideo: boolean
}

export type FilterMenuProps = {
  contact: ContactCardProps
}
export type AptigramProps = SharedCardProps & {
  type: 'aptigram'
  thumbnail: string
  permalink: string
}
