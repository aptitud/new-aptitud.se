interface CardProps {
    title: string
    text: string
    image?: string
}
export const Card = ({ title, text }: CardProps) => {
    return (
        <div className="bg-basseColor">
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}
