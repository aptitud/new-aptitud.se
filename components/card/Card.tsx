/* eslint-disable @next/next/no-img-element */
//TODO: Add to eslint
import * as Dialog from '@radix-ui/react-dialog'

import { CSSProperties } from 'react'

export interface CardProps {
    title: string
    text: string
    image: string | null
}
export const Card = ({ title, text, image }: CardProps) => {
    const imageStyle: CSSProperties = image
        ? {
              backgroundImage: `linear-gradient(to bottom, #fff0, #3e6991), url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }
        : {}

    return (
        <Dialog.Root>
            <Dialog.Portal>
                <Dialog.Overlay />
                {/* <Dialog.Content className="fixed top-1/2 left-1/2 w-1/2 translate-x-[-50%] translate-y-[-50%]"> */}

                <Dialog.Content className="fixed inset-0 ">
                    <div className="flex flex-col">
                        {/* TODO:Fix image scaling */}
                        <img
                            src={image ?? ''}
                            alt={title}
                            className="max-h-[40vh]"
                        />
                        <div className="h-1/3 text-white bg-gradient-to-b from-transparent to-aptitud-blue_dim rounded-b-lg overflow-hidden">
                            <h3 className="text-2xl mb-2 font-bold">{title}</h3>
                            {text}
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
            <Dialog.Trigger asChild>
                <div
                    role={'button'}
                    className="rounded-lg h-52 md:h-96 p-2 cursor-pointer"
                    style={imageStyle}
                >
                    <div className="h-2/3"></div>
                    <div className="h-1/3 text-white bg-gradient-to-b from-transparent to-aptitud-blue_dim rounded-b-lg text-clip overflow-hidden">
                        <h3 className="text-2xl mb-2 font-bold">{title}</h3>
                        {text}
                    </div>
                </div>
            </Dialog.Trigger>
        </Dialog.Root>
    )
}
