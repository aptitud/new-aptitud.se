/* eslint-disable @next/next/no-img-element */
//TODO: Add to eslint
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'

import { CSSProperties } from 'react'

export interface CardProps {
    title: string
    text: string
    image: string | null
    colorCode: string
}

export const Card = (props: CardProps) => {
    return (
        <Dialog.Root>
            <Dialog.Portal>
                <Dialog.Overlay />
                {/* <Dialog.Content className="fixed top-1/2 left-1/2 w-1/2 translate-x-[-50%] translate-y-[-50%]"> */}

                <Dialog.Content
                    className={`fixed inset-0 md:top-1/2 md:left-1/2 md:w-1/2 md:translate-x-[-50%] md:translate-y-[-50%]`}
                    style={{ backgroundColor: `var(--${props.colorCode})` }}
                >
                    <DetailCard {...props} />
                    <Dialog.Close className="absolute flex justify-center items-center rounded top-2 right-2 w-10 h-10 bg-white b">
                        <Cross2Icon />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
            <Dialog.Trigger asChild>
                <SummaryCard {...props} />
            </Dialog.Trigger>
        </Dialog.Root>
    )
}

const DetailCard = (props: CardProps) => {
    const { image, title, text } = props
    return (
        <div className="relative px-4 py-8">
            {/* TODO:Fix image scaling */}
            {image && <img className="mx-auto" src={image ?? ''} alt={title} />}
            <div className="h-1/3 text-white">
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
