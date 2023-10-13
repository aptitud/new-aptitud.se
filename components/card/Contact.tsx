import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { CSSProperties, useState } from 'react'
import { CardVideo } from './CardVideo'
import ReactMarkdown from 'react-markdown'
import { CardImage } from './CardImage'


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
        <CardImage { ...props } />
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
  
    return (
      <span
        role={'button'}
        className={``}
        tabIndex={0}
        onKeyDown={onKeyDown}
        {...props}
      >
       Kontakt
      </span>
    )
}
