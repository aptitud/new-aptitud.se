import { CSSProperties } from 'react'

export interface CardProps {
    title: string
    text: string
    image?: string
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
        <div className="rounded-lg h-52 md:h-96 p-2" style={imageStyle}>
            <div className="h-2/3"></div>
            <div className="h-1/3 text-white bg-gradient-to-b from-transparent to-aptitud-blue_dim rounded-b-lg overflow-hidden">
                <h3 className="text-2xl mb-2 font-bold">{title}</h3>
                {text}
            </div>
        </div>
    )
}
