import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { CSSProperties } from 'react'
import { CardImage } from './CardImage'
import { getFellows } from '../../domain/contentful/service'
import Link from 'next/link'

type SocialLink = Awaited<
  Required<ReturnType<typeof getFellows>>
>['0']['services'][0]

type SharedCardProps = {
  title: string
  text: string
  image: string | null
  colorCode: string
}
export type CardProps = SharedCardProps &
  (
    | {
        type: 'fellow'
        //TODO: get rid of undefined values...
        socialLinks: SocialLink[]
      }
    | {
        type: 'post'
      }
  )

// TODO: why does cards get too tall in mobile?

export const Card = ({ item }: { item: CardProps }) => {
  return (
    <Dialog.Root>
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
        <SummaryCard {...item} />
      </Dialog.Trigger>
    </Dialog.Root>
  )
}

const DetailCard = (props: CardProps) => {
  if (props.type === 'fellow') {
    const { title, text, colorCode, image, socialLinks } = props
    return (
      <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_2fr] gap-3">
        {/* TODO:Fix image scaling */}
        <div className="relative aspect-square">
          <CardImage image={image} title={title} colorCode={colorCode} />
          <SocialLinks name={title} socialLinks={socialLinks} />
        </div>
        <div className="text-white mt-2">
          <h3 className="text-2xl mb-2 font-bold">{title}</h3>
          <p className="">{text}</p>
        </div>
      </div>
    )
  }

  const { title, text, colorCode, image } = props
  return (
    <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_2fr] gap-3">
      {/* TODO:Fix image scaling */}
      <div className="relative aspect-square">
        <CardImage image={image} title={title} colorCode={colorCode} />
      </div>
      <div className="text-white mt-2">
        <h3 className="text-2xl mb-2 font-bold">{title}</h3>
        <p className="">{text}</p>
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
    <div className="absolute top-60 inline-flex bg-aptitud-light-grey rounded-lg gap-2 p-2">
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

const SummaryCard = ({
  image,
  title,
  text,
  colorCode,
  ...props
}: CardProps) => {
  const imageWithGradient: CSSProperties = image
    ? {
        backgroundImage: `linear-gradient(to bottom, #fff0, var(--${colorCode})), url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundImage: `linear-gradient(to bottom, #fff0, var(--${colorCode}))`,
      }

  return (
    <div
      role={'button'}
      className={`rounded-lg h-52 md:h-96 p-2 cursor-pointer`}
      style={imageWithGradient}
      {...props}
    >
      <div className="h-2/3"></div>
      <div className={`h-1/3 text-white text-clip overflow-hidden`}>
        <h3 className="text-2xl mb-2 font-bold">{title}</h3>
        {text}
      </div>
    </div>
  )
}
