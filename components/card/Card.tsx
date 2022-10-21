interface CardProps {
    title: string
    text: string
    image?: string
}
export const Card = ({ title, text, image }: CardProps) => {
    return (
        <div className="bg-basseColor relative">
            <div className="z-2">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
            {image && (
                <img src={image} className="absolute inset-0 opacity-50" />
            )}
        </div>
    )
}
