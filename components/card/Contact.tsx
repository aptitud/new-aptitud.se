import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { ContactCardProps } from './types'

export const ContactDetail = (props: ContactCardProps) => {
  const { title, text, image } = props
  return (
    <div className="flex flex-row">
      <div className="relative aspect-square w-3/5">
        <Image src={`https:${image}`} width={600} height={400} alt={title} />
      </div>
      <div className="text-white mt-2">
        <h3 className="text-xl md:text2xl mb-2 font-medium">{title}</h3>
        <div className="my-3">
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
