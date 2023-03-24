import Image, { ImageProps } from 'next/image'

const contentfulLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage = (props: ImageProps) => {
  return (
    <Image
      loader={contentfulLoader}
      layout="fill"
      objectFit="contain"
      {...props}
    />
  )
}

export default ContentfulImage
