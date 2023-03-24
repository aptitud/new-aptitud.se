import Image from 'next/image'
import ContentfulImage from './contentful-image/ContentfulImage'

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
        alt="asdf"
        width={200}
        height={80}
        style={{ fill: colorCode, marginLeft: 'auto', marginRight: 'auto' }}
      />
    )
  }
  return <ContentfulImage src={image} />
}
