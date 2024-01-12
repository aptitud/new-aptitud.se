import React from 'react'
import { getFellows } from '../../lib/domain/contentful/service'

export type SocialLink = Awaited<Required<ReturnType<typeof getFellows>>>['0']['services'][0]

export type SharedCardProps = {
  id: string
  title: string
  text: string
  image: string | null
  colorCode: string
}

export type CardProps = FellowCardProps | PostsCardProps | AptigramProps | ContactCardProps

export type PostsCardProps = SharedCardProps & {
  type: 'post'
  postContent: string
}

export type FellowCardProps = SharedCardProps & {
  type: 'fellow'
  //TODO: get rid of undefined values...
  socialLinks: SocialLink[]
  video: string | null
  showVideo: boolean
}

export type AptigramProps = SharedCardProps & {
  type: 'aptigram'
  thumbnail: string
  permalink: string
}

export type ContactCardProps = SharedCardProps & {
  type: 'contact'
  summaryTitle: string
  colorCode: string
}

export type CardWithEvents<TCard extends CardProps> = TCard & {
  handleCardClick: (e: React.MouseEvent) => void
}
