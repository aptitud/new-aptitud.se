'use client'

import { CardProps, AptigramCardProps, PostsCardProps } from '../../lib/domain/types'
import { FellowCard } from './FellowCard'
import { CardTitle } from '../CardTitle'
import React, { CSSProperties } from 'react'

const getBackgroundStyle = (item: CardProps): CSSProperties => {
  switch (item.type) {
    case 'post':
      return { backgroundColor: `var(--${item.colorCode})` }
    case 'aptigram':
      return createImageWithGradientStyles(item, { fromPercent: '70%', toPercent: '98%' })
    default:
      return item.image ? createImageWithGradientStyles(item) : { backgroundColor: `var(--${item.colorCode})` }
  }
}

const createImageWithGradientStyles = (
  item: CardProps,
  gradientOptions = { fromPercent: '40%', toPercent: '75%' }
): CSSProperties => ({
  backgroundImage: `linear-gradient(to bottom, #fff0 ${gradientOptions.fromPercent}, var(--${item.colorCode}) ${
    gradientOptions?.toPercent
  }), url('${(item.type === 'aptigram' && item.thumbnail) || item.image}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
})

export const Card = ({ item }: { item: CardProps }) => {
  return (
    // @TODO leaving this code to be able to showcase border easily
    // <div className="border-4 md:border-8 border-white border-opacity-40 card-shadow rounded-lg">
    <div role="button" style={getBackgroundStyle(item)} className="h-60 md:h-96 text-white rounded-lg card-shadow">
      {renderCard(item)}
    </div>
    // </div>
  )
}

const PostCard = (props: PostsCardProps) => {
  return (
    <div className={`h-full p-4`}>
      <CardTitle>{props.title}</CardTitle>
      <span className={`text-xs md:text-lg line-clamp-[10]`}>
        {props.postContent.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </span>
    </div>
  )
}

const AptigramCard = (item: AptigramCardProps) => {
  return (
    <div className="h-full">
      <div className="h-5/6 p-0 overflow-hidden flex"></div>
      <div className={`h-1/6 m-0 px-3 py-3 md:py-5`}>
        <p className="w-full truncate">{item.text}</p>
      </div>
    </div>
  )
}

const renderCard = (item: CardProps) => {
  switch (item.type) {
    case 'fellow':
      return <FellowCard {...item} />
    case 'post':
      return <PostCard {...item} />
    case 'aptigram':
      return <AptigramCard {...item} />
    default:
      return <></>
  }
}
