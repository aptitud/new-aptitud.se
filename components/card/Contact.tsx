import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type ContactCardProps = {
  title: string
  summaryTitle: string
  text: string
  image: string | null
  colorCode: string
  onKeyDown: any
}

export const Contact = ({ item }: { item: ContactCardProps }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClick = (e: KeyboardEvent) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
      onClick(e)
    }
  }
  item.onKeyDown = onKeyDown

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 md:grid md:place-items-center overflow-y-auto backdrop-blur-sm bg-aptitud-blue_green-rgba z-30">
          <Dialog.Content
            className="relative min-h-full w-full md:min-h-[40vh] md:w-[60vw] p-5 md:rounded-lg"
            style={{ backgroundColor: `var(--${item.colorCode})` }}
          >
            <ContactDetail {...item} />
            <Dialog.Close className="absolute flex justify-center items-center rounded-full top-2 right-2 w-12 h-12  md:-top-4 md:-right-4 bg-aptitud-light-grey">
              <span className="rounded-full bg-white w-8 h-8 flex justify-center items-center">
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </span>
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
  const { title, text, image } = props
  return (
    <div className="flex flex-row">
      <div className="relative aspect-square w-3/5">
        <Image src={`https:${image}`} fill alt={title} />
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

const ContactSummary = ({ image, title, text, colorCode, summaryTitle, onKeyDown, ...props }: ContactCardProps) => {
  return (
    <span role={'button'} className={``} tabIndex={0} onKeyDown={onKeyDown} {...props}>
      Kontakt
    </span>
  )
}
