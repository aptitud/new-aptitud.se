import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { CSSProperties } from 'react'
import { CardImage } from './CardImage'

export interface CardProps {
  title: string
  text: string
  image: string | null
  colorCode: string
}

// TODO: why does cards get too tall in mobile?

export const Card = (props: CardProps) => {
  return (
    <Dialog.Root>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 md:grid md:place-items-center overflow-y-auto">
          <Dialog.Content
            className="relative min-h-full w-full md:min-h-[60vh] md:w-[80vw] p-5 md:rounded-lg"
            style={{ backgroundColor: `var(--${props.colorCode})` }}
          >
            <DetailCard {...props} />
            <Dialog.Close className="absolute flex justify-center items-center rounded top-2 right-2 w-10 h-10 bg-white md:-top-2 md:-right-2">
              <Cross2Icon />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
      <Dialog.Trigger asChild>
        <SummaryCard {...props} />
      </Dialog.Trigger>
    </Dialog.Root>
  )
}

const DetailCard = (props: CardProps) => {
  const { image, title, text, colorCode } = props
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
