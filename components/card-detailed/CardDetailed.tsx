import Image from 'next/image'
import { AptigramCardProps, CardProps, ContactCardProps, FellowCardProps, PostsCardProps } from '../../lib/domain/types'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactMarkdown from 'react-markdown'
import { CardTitle } from '../CardTitle'
import { CardVideo } from './CardVideo'
import { SocialLinks } from './SocialLinks'
import React from 'react'

export const CardDetailed = (item: CardProps) => {
  return <div>{renderCardDetailed(item)}</div>
}

const FellowDetailed = (props: FellowCardProps) => {
  const { title, text, image, socialLinks, video } = props
  return (
    <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-2 gap-8">
      <div className="relative aspect-[3/4] h-96 md:h-full md:max-w-xl rounded-lg border-2 border-aptitud-light-grey  bg-aptitud-light-grey">
        <CardVideo image={image} title={title} video={video} />
      </div>
      <div className="text-white mt-4 md:mt-2">
        <h3 className="text-2xl md:text-3xl mb-2 font-medium">{title}</h3>
        <p className="mt-4 text-xl">{text}</p>
        <SocialLinks name={title} socialLinks={socialLinks} />
      </div>
    </div>
  )
}

const PostDetailed = (props: PostsCardProps) => {
  const { title, text, postContent } = props
  return (
    <div className="text-white mt-2">
      <CardTitle>{title}</CardTitle>
      <div className="text-xl">
        {postContent.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

const AptigramDetailed = (props: AptigramCardProps) => {
  const { thumbnail, text, image, permalink } = props
  return (
    <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_1fr] gap-6">
      <div className="relative rounded-lg border-4 border-white bg-white overflow-hidden flex justify-center">
        <Image
          className="rounded-md"
          src={thumbnail ? thumbnail : image ? image : ''}
          height={400}
          width={600}
          alt="aptigram"
        />
      </div>
      <div className="text-white mt-1">
        <a className="flex items-center text-xl" href={permalink} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 mr-1" />
          Se på Instagram
        </a>
        <div className="mt-3 text-xl">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

const ContactDetailed = (props: ContactCardProps) => {
  const { title, text, image } = props
  return (
    <div className="flex flex-row">
      <div className="relative aspect-square w-3/5">
        <Image src={`https:${image}`} width={600} height={400} alt={title} />
      </div>
      <div className="text-white mt-2">
        <h3 className="text-xl md:text2xl mb-2 font-medium">{title}</h3>
        <div className="my-3">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

const renderCardDetailed = (item: CardProps) => {
  switch (item.type) {
    case 'fellow':
      return <FellowDetailed {...item} />
    case 'post':
      return <PostDetailed {...item} />
    case 'aptigram':
      return <AptigramDetailed {...item} />
    case 'contact':
      return <ContactDetailed {...item} />
    default:
      return <></>
  }
}
