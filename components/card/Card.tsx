import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { CSSProperties, useState } from 'react'
import { CardVideo } from './CardVideo'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { CardProps, AptigramProps, PostsCardProps, SocialLink } from './types'
import { FellowCard } from './FellowCard'

export const Card = ({ item }: { item: CardProps }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClick = (e: KeyboardEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
      onClick(e)
    }
  }

  item.onKeyDown = onKeyDown

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 md:grid md:place-items-center overflow-y-auto backdrop-blur-sm z-30"
          style={{ backgroundColor: `var(--${item.colorCode}-rgba)` }}
        >
          <Dialog.Content
            className="relative min-h-full w-full md:min-h-[40vh]  md:w-[90vw] lg:w-[75vw] xl:w-[60vw] p-10 md:rounded-lg"
            style={{
              backgroundColor: `var(--${item.colorCode})`,
            }}
          >
            <DetailCard {...item} />
            <Dialog.Close className="absolute flex justify-center items-center rounded-full top-2 right-2 w-12 h-12  md:-top-4 md:-right-4 bg-aptitud-light-grey">
              <span className="rounded-full bg-white w-8 h-8 flex justify-center items-center">
                <Cross2Icon className="w-5 h-5" />
              </span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
      <Dialog.Trigger asChild>
        {item.type === 'fellow' ? (
          <FellowCard {...item} showVideo={item.showVideo} />
        ) : item.type === 'aptigram' ? (
          <Aptigram {...item} />
        ) : (
          <PostCard {...item} />
        )}
      </Dialog.Trigger>
    </Dialog.Root>
  )
}

const DetailCard = (props: CardProps) => {
  if (props.type === 'aptigram') {
    const { thumbnail, text, image, permalink } = props
    return (
      <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_1fr] gap-6">
        <div className="relative rounded-lg border-4 border-white bg-white overflow-hidden flex justify-center">
          <img className="rounded-md" src={thumbnail ? thumbnail : image ? image : ''} alt="aptigram" />
        </div>
        <div className="text-white mt-1">
          <a className="flex text-xl" href={permalink} target="_blank" rel="noreferrer">
            <InstagramLogoIcon className="mr-2 mt-1" width="24" height="24" />
            Se på Instagram
          </a>
          <p className="mt-3 text-xl">
            <ReactMarkdown>{text}</ReactMarkdown>
          </p>
        </div>
      </div>
    )
  }

  if (props.type === 'fellow') {
    const { title, text, colorCode, image, socialLinks, video } = props
    return (
      <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-2 gap-8">
        <div className="relative aspect-[3/4] h-96 md:h-full md:max-w-xl rounded-lg border-2 border-aptitud-light-grey  bg-aptitud-light-grey">
          <CardVideo image={image} title={title} colorCode={colorCode} video={video} />
        </div>
        <div className="text-white mt-4 md:mt-2">
          <h3 className="text-2xl md:text-3xl mb-2 font-medium">{title}</h3>
          <p className="mt-4 text-xl">{text}</p>
          <SocialLinks name={title} socialLinks={socialLinks} />
        </div>
      </div>
    )
  }

  const { title, text, image, postContent } = props
  return (
    <div className="text-white mt-2">
      <h3 className="text-2xl md:text-3xl mb-2 font-medium">{title}</h3>
      <p className="text-xl">
        <ReactMarkdown>{postContent ? postContent : text}</ReactMarkdown>
      </p>
    </div>
  )
}

const SocialLinks = ({ socialLinks, name }: { socialLinks: SocialLink[]; name: string }) => {
  const email = (name: string) =>
    name.toLowerCase().replace(' ', '.').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace('ü', 'u')

  const mapIcons: Record<SocialLink['name'], string> = {
    blog: 'fa fa-fw fa-globe',
    'stack-overflow': 'fa fa-fw fa-stack-overflow',
    github: 'fa fa-fw fa-github',
    instagram: 'fa fa-fw fa-instagram',
    key: 'fa fa-fw fa-key',
    linkedin: 'fa fa-fw fa-linkedin',
    slideshare: 'fa fa-fw fa-slideshare',
    twitter: 'fa fa-fw fa-twitter',
  }

  return (
    <div className="inline-flex bg-aptitud-light-grey rounded-lg gap-2 p-2 mt-7">
      <Link
        target="_blank"
        key={name}
        href={`mailto:${email(name)}@aptitud.se`}
        className="bg-white rounded-lg flex p-4"
      >
        <i
          //TODO: fontawesome hell
          style={{ fontSize: '18px' }}
          className={'fa fa-fw fa-envelope md:text-6xl justify-center align-center text-black'}
        />
      </Link>
      {socialLinks.map(({ url, name }) => (
        <Link target="_blank" key={name} href={url} className="bg-white rounded-lg flex p-4">
          <i
            //TODO: fontawesome hell
            style={{ fontSize: '18px' }}
            className={`${mapIcons[name]} md:text-6xl justify-center align-center text-black`}
          />
        </Link>
      ))}
    </div>
  )
}

const PostCard = ({ image, title, text, colorCode, postContent, onKeyDown, ...props }: PostsCardProps) => {
  const backgroundStyle: CSSProperties = {
    backgroundColor: `var(--${colorCode})`,
  }

  const height = image ? 'h-2/3' : 'h-full'
  const lineClamp = image ? 'line-clamp-[6]' : 'line-clamp-[8]'
  return (
    <div
      role={'button'}
      className={`rounded-lg h-60 md:h-96 cursor-pointer m-0 p-3 md:p-4 card-shadow apti-card`}
      style={backgroundStyle}
      tabIndex={0}
      {...props}
      onKeyDown={onKeyDown}
    >
      {/*image ? (
        <div className="relative h-1/3 p-4 md:p-8 lg:p-10">
          <div className="relative aspect-square w-full -mt-10 md:-mt-15 lg:-mt-20">
            <Image src={`https:${image}`} alt={title || ''} fill sizes="100vw" />
          </div>
        </div>
      ) : (
        <></>
      )*/}
      <div className={`${height} text-white m-0 p-0`}>
        <h3 className="apti-headline truncate">{title}</h3>
        <span className={`text-xs md:text-lg ${lineClamp}`}>
          <ReactMarkdown>{postContent ? postContent : text}</ReactMarkdown>
        </span>
      </div>
    </div>
  )
}

const Aptigram = ({ image, text, thumbnail, permalink, onKeyDown, ...props }: AptigramProps) => {
  return (
    <div
      className="rounded-lg h-60 md:h-96 p-2 md:p-2 cursor-pointer card-shadow apti-card"
      tabIndex={0}
      style={{ backgroundColor: 'var(--aptitud-blue_green)' }}
      onKeyDown={onKeyDown}
      {...props}
    >
      <div className="h-4/6 p-0 overflow-hidden rounded-md flex">
        <img className="w-full align-centre object-cover" src={thumbnail ? thumbnail : image ? image : ''}></img>
      </div>
      <div className={`h-2/6 text-white m-0 px-2 py-3 md:py-5`}>
        <div className="grid grid-cols-1 relative h-full overflow-hidden">
          <span className="text-base md:text-lg line-clamp-3 md:line-clamp-3 text-white">
            <p className="w-full">{text}</p>
          </span>
        </div>
      </div>
    </div>
  )
}
