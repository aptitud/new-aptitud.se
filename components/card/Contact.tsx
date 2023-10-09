import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { CSSProperties, useState } from 'react'
import { CardVideo } from './CardVideo'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'


export type ContactCardProps = {
  title: string
  summaryTitle: string
  text: string
  image: string | null
  colorCode: string
  onKeyDown: any
}

export const Contact = ({ item }: { item: ContactCardProps }) => {

  const [isOpen, setIsOpen] = useState(false);

  const onClick = (e : KeyboardEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }
  
  const onKeyDown = (e : KeyboardEvent) => {   
    if (e.key === " " || e.key === "Enter" || e.key === "Spacebar") {
      onClick(e);
    }
  }
  item.onKeyDown = onKeyDown;
  
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 md:grid md:place-items-center overflow-y-auto bg-aptitud-overlay">
          <Dialog.Content
            className="relative min-h-full w-full md:min-h-[60vh] md:w-[80vw] p-5 md:rounded-lg"
            style={{ backgroundColor: `var(--${item.colorCode})` }}
          >
            <ContactDetail {...item} />
            <Dialog.Close className="absolute flex justify-center items-center rounded top-2 right-2 w-10 h-10 bg-white md:-top-2 md:-right-2">
              <Cross2Icon />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
      <Dialog.Trigger asChild>
          <ContactSummary {...item} />
      </Dialog.Trigger>
    </Dialog.Root>
  )
}

const ContactDetail = (props: ContactCardProps) => {
  const { title, text, colorCode, image } = props
  return (
    <div className="grid grid-rows-[1fr_2fr] md:grid-rows-none md:grid-cols-[1fr_2fr] gap-3">
      {/* TODO:Fix image scaling */}
      <div className="relative aspect-square">
        <CardVideo image={image} title={title} colorCode={colorCode} video = { null }/>
      </div>
      <div className="text-white mt-2">
        <h3 className="text-xl md:text2xl mb-2 font-medium">{title}</h3>
        <p className="">
            <ReactMarkdown>{text}</ReactMarkdown>
        </p>
      </div>
    </div>
  )
}

const ContactSummary = ({
    image,
    title,
    text,
    colorCode,
    summaryTitle,
    onKeyDown,
    ...props
  }: ContactCardProps) => {
    const backgroundStyle: CSSProperties =  {
          backgroundColor: `var(--aptitud-transparent)`,
        }
  
    return (
      <div
        role={'button'}
        className={`rounded-lg w-16 h-16 md:h-24 md:w-24 p-2 cursor-pointer m-0 p-0`}
        style={backgroundStyle}
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...props}
      >
        <div className="relative h-full w-full">
          { image ?
            <Image src={`https:${image}`} layout='fill' alt={summaryTitle} className='object-cover object-left-top'/>
            : <Image src="/logo.svg" alt="aptitud"  layout='fill' />
          }
          </div>
      
      </div>
    )
}
