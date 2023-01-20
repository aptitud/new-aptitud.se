import Image from 'next/image'

export const CardImage = ({
  image,
  colorCode,
  title,
}: {
  image: string | null
  title?: string
  colorCode: string
}) => {
  if (!image) {
    return (
      <Image
        src="/logo.svg"
        width={200}
        height={80}
        style={{ fill: colorCode, marginLeft: 'auto', marginRight: 'auto' }}
      />
    )
  }
  return <img className="mx-auto" src={image ?? ''} alt={title} />
}
