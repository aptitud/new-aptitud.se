import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { CSSProperties, useState } from 'react'
import { CardImage } from './CardImage'
import { CardVideo } from './CardVideo' 
import { getFellows } from '../../domain/contentful/service'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

type SocialLink = Awaited<
  Required<ReturnType<typeof getFellows>>
>['0']['services'][0]

type SharedCardProps = {
  title: string
  text: string
  image: string | null
  colorCode: string
  onKeyDown: any
}
export type CardProps = FellowCardProps | PostsCardProps | AptigramProps

type PostsCardProps = SharedCardProps & {
  type: 'post'
  postContent: string,
}

type FellowCardProps = SharedCardProps & {
  type: 'fellow'
  //TODO: get rid of undefined values...
  socialLinks: SocialLink[]
  video: string | null
}

type AptigramProps = SharedCardProps & {
  type: 'aptigram'
  thumbnail: string
  permalink: string
}



// TODO: why does cards get too tall in mobile?

export const Card = ({ item }: { item: CardProps }) => {

  const [isOpen, setIsOpen] = useState(false);

  const onClick = (e: KeyboardEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
      onClick(e);
    }
  }

  item.onKeyDown = onKeyDown;

  return (
    item.type === 'aptigram' ?
      <Aptigram {...item} />
      : <Dialog.Root open={isOpen} onOpenChange={setIsOpen} >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 md:grid md:place-items-center overflow-y-auto">
            <Dialog.Content
              className="relative min-h-full w-full md:min-h-[60vh] md:w-[80vw] p-5 md:rounded-lg"
              style={{ backgroundColor: `var(--${item.colorCode})` }}
            >
              <DetailCard {...item} />
              <Dialog.Close className="absolute flex justify-center items-center rounded top-2 right-2 w-10 h-10 bg-white md:-top-2 md:-right-2">
                <Cross2Icon />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
        <Dialog.Trigger asChild>
          {
            item.type === 'fellow' ?
              <FellowCard  {...item} />
              : <PostCard  {...item} />
          }
        </Dialog.Trigger>
      </Dialog.Root>
  )
}


const DetailCard = (props: CardProps) => {
  if (props.type === 'aptigram') {
    return <></>
  }

  if (props.type === 'fellow') {
    const { title, text, colorCode, image, socialLinks, video } = props
    return (
      <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_2fr] gap-3">
        {/* TODO:Fix image scaling */}
        <div className="relative aspect-square">
          <CardImage image={image} title={title} colorCode={colorCode} video = { video }/>
          <SocialLinks name={title} socialLinks={socialLinks} />   
        </div>
        <div className="text-white mt-8 md:mt-2">
          <h3 className="text-xl md:text-2xl mb-2 font-medium">{title}</h3>
          <p className="">{text}</p>
        </div>
      </div>
    )
  }


  const { title, text, colorCode, image, postContent } = props
  return (
    <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_2fr] gap-3">
      {/* TODO:Fix image scaling */}
      <div className="relative aspect-square">
        <CardImage image={image} title={title} colorCode={colorCode} video = { null } />
      </div>
      <div className="text-white mt-2">
        <h3 className="text-xl md:text-2xl mb-2 font-medium">{title}</h3>
        <p className="">
          <ReactMarkdown>{postContent ? postContent : text}</ReactMarkdown>
        </p>
      </div>
    </div>
  )

}

const SocialLinks = ({
  socialLinks,
  name,
}: {
  socialLinks: SocialLink[]
  name: string
}) => {
  const email = (name: string) =>
    name
      .toLowerCase()
      .replace(' ', '.')
      .replace('å', 'a')
      .replace('ä', 'a')
      .replace('ö', 'o')
      .replace('ü', 'u')

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
    <div className="absolute -bottom-5 inline-flex bg-aptitud-light-grey rounded-lg gap-2 p-2">
      <Link
        target="_blank"
        key={name}
        href={`mailto:${email(name)}@aptitud.se`}
      >
        <a target="_blank" className="bg-white rounded-lg flex p-4">
          <i
            //TODO: fontawesome hell
            style={{ fontSize: '18px' }}
            className={
              'fa fa-fw fa-envelope md:text-6xl justify-center align-center text-black'
            }
          />
        </a>
      </Link>
      {socialLinks.map(({ url, name }) => (
        <Link target="_blank" key={name} href={url}>
          <a target="_blank" className="bg-white rounded-lg flex p-4">
            <i
              //TODO: fontawesome hell
              style={{ fontSize: '18px' }}
              className={`${mapIcons[name]} md:text-6xl justify-center align-center text-black`}
            />
          </a>
        </Link>
      ))}
    </div>
  )
}

const FellowCard = ({
  image,
  title,
  text,
  colorCode,
  socialLinks,
  onKeyDown,
  ...props
}: FellowCardProps) => {
  const imageWithGradient: CSSProperties = image
    ? {
      backgroundImage: `linear-gradient(to bottom, #fff0 50%, var(--aptitud-petrol) 90%), url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
    : {
      backgroundColor: `var(--${colorCode})`,
    }

  return (
    <div
      role={'button'}
      className={`rounded-lg h-60 md:h-96 px-3 pb-3 pt-10 md:px-4 md:pb-6 md:pt-8 cursor-pointer`}
      style={imageWithGradient}
      tabIndex={0}
      onKeyDown={onKeyDown}
      title={title}
      {...props}
    >
      <div className="h-3/5"></div>
      <div className={`h-2/5 text-white m-0 p-0`}>
        <div className="grid grid-cols-1 relative h-full">
          <h3 className="text-base md:text-2xl mb-1 md:mb-1 font-medium truncate">{title}</h3>
          <span className='text-xs md:text-lg line-clamp-3  md:line-clamp-3'>
            {text}
          </span>
        </div>
      </div>
    </div>
  )
}
const PostCard = ({
  image,
  title,
  text,
  colorCode,
  postContent,
  onKeyDown,
  ...props
}: PostsCardProps) => {
  const backgroundStyle: CSSProperties = {
    backgroundColor: `var(--${colorCode})`,
  }

  const height = image ? 'h-2/3' : 'h-full'
  const lineClamp = image ? 'line-clamp-[6]' : 'line-clamp-[8]'
  return (
    <div
      role={'button'}
      className={`rounded-lg h-60 md:h-96 cursor-pointer m-0 p-3 md:p-4`}
      style={backgroundStyle}
      tabIndex={0}
      {...props}
      onKeyDown={onKeyDown}
    >

      {image ?
        <div className="relative h-1/3" >
          <div className="relative aspect-square h-full">
            <Image src={`https:${image}`} layout='fill' alt={title} className='object-fill' />
          </div>
        </div>

        : <></>
      }
      <div className={`${height} text-white m-0 p-0`}>
        <h3 className="text-base md:text-2xl mb-1 md:mb-2 font-medium truncate">{title}</h3>
        <span className={`text-xs md:text-lg ${lineClamp}`}>
          <ReactMarkdown>{postContent ? postContent : text}</ReactMarkdown>
        </span>
      </div>
    </div>
  )


}

const Aptigram = ({
  image,
  text,
  thumbnail,
  permalink,
  colorCode,
}: AptigramProps) => {
  

  const polaroidBackground: CSSProperties = {
    backgroundColor: `var(--${colorCode})`,
  }


  
  return (
    <div className="rounded-lg h-60 md:h-96 p-2 md:p-2 cursor-pointer" 
        tabIndex={0} 
        style={polaroidBackground}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
            window.open(permalink, '_blank');
          }
        }}
    >
      <a
        role={'button'}
        href={permalink}
        target='_blank'
        rel="noreferrer"    
      >
        <div className="h-4/6 p-0 overflow-hidden rounded-md flex">
          <Image className='w-full align-centre object-cover' 
            src= { thumbnail ? thumbnail : image ? image : '' } >
          </Image>
        </div>
        <div className={`h-2/6 text-white m-0 px-2 py-4 md:py-5`}>
          <div className="grid grid-cols-1 relative h-full overflow-hidden">
            <span className='text-base text-xs md:text-lg md:text-2xl line-clamp-3 md:line-clamp-3 text-white'>
              <p className=' w-full'>{text}
              </p>
            </span>
          </div>
        </div>
      </a>
    </div>
  )
}
