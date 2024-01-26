'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'

const Modal = ({ colorCode, children }: { colorCode: string; children: React.ReactNode }) => {
  const router = useRouter()

  function onDismiss() {
    router.back()
  }

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 md:grid md:place-items-center overflow-y-auto backdrop-blur-sm z-30">
          <Dialog.Content
            onEscapeKeyDown={onDismiss}
            onInteractOutside={onDismiss}
            className="relative w-full min-h-full md:min-h-[400px] md:max-w-[90%] xl:w-[1098px] 2xl: md:my-12 p-10 md:rounded-lg"
            style={{
              backgroundColor: `var(--${colorCode})`,
            }}
          >
            {children}
            <Dialog.Close
              onClick={onDismiss}
              className="absolute flex justify-center items-center rounded-full top-2 right-2 w-12 h-12  md:-top-4 md:-right-4 bg-aptitud-light-grey"
            >
              <span className="rounded-full bg-white w-8 h-8 flex justify-center items-center">
                <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
              </span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
