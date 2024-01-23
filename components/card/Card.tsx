'use client'

import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { CardProps, AptigramCardProps, PostsCardProps } from '../../lib/domain/types'
import { FellowCard } from './FellowCard'
import React from 'react'
import { CardTitle } from '../CardTitle'

export const Card = ({ item }: { item: CardProps }) => {
  if (item.type === 'fellow') {
    return <FellowCard {...item} showVideo={item.showVideo} />
  }
  if (item.type === 'aptigram') {
    return <AptigramCard {...item} />
  }
  if (item.type === 'post') {
    return <PostCard {...item} />
  } else {
    return <></>
  }
}

const PostCard = React.forwardRef<HTMLDivElement, PostsCardProps>(function PostCardComponent(
  { id, type, image, title, text, colorCode, postContent, ...props },
  ref
) {
  const height = image ? 'h-2/3' : 'h-full'
  const lineClamp = image ? 'line-clamp-[6]' : 'line-clamp-[8]'
  return (
    <div
      role={'button'}
      className={`rounded-lg h-60 md:h-96 cursor-pointer m-0 p-3 md:p-4 card-shadow`}
      style={{ backgroundColor: `var(--${colorCode})` }}
      tabIndex={0}
      ref={ref}
      {...props}
    >
      <div className={`${height} text-white m-0 p-0`}>
        <CardTitle>{title}</CardTitle>
        <span className={`text-xs md:text-lg ${lineClamp}`}>
          <ReactMarkdown>{postContent ? postContent : text}</ReactMarkdown>
        </span>
      </div>
    </div>
  )
})

const AptigramCard = React.forwardRef<HTMLDivElement, AptigramCardProps>(function AptigramComponent(
  { id, title, type, permalink, thumbnail, colorCode, image, text, ...props },
  ref
) {
  return (
    <div
      className="rounded-lg h-60 md:h-96 p-2 md:p-2 cursor-pointer card-shadow"
      tabIndex={0}
      style={{ backgroundColor: 'var(--aptitud-blue_green)' }}
      ref={ref}
      {...props}
    >
      <div className="h-4/6 p-0 overflow-hidden rounded-md flex">
        <Image
          className="w-full align-centre object-cover"
          src={thumbnail ? thumbnail : image ? image : ''}
          alt="aptigram"
          height={400}
          width={600}
        />
      </div>
      <div className={`h-2/6 text-white m-0 px-2 py-3 md:py-5`}>
        <div className="grid grid-cols-1 relative h-full overflow-hidden">
          <span className="text-base md:text-lg md:text-2xl line-clamp-3 md:line-clamp-3 text-white">
            <p className="w-full">{text}</p>
          </span>
        </div>
      </div>
    </div>
  )
})
