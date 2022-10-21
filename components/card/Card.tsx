import { CSSProperties } from 'react'

interface CardProps {
    title: string
    text: string
    image?: string
}
export const Card = ({ title, text, image }: CardProps) => {
    const backgroundStyle: CSSProperties = image
        ? {
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }
        : {}
    return (
        <div
            className="border rounded-lg m-2 h-96 flex flex-col justify-end"
            style={backgroundStyle}
        >
            <div className="z-2 self-center font-bold">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}
