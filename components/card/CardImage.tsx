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
    return <Image src="/logo.svg" alt="asdf" layout="fill" />
  }
  return (
    <Image src={`https:${image}`} layout="fill" objectFit="cover" alt="asdf" />
  )
}
