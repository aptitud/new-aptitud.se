import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { getAllCards } from '../../../lib/domain/cards'
import Link from 'next/link'
import { CardDetailed } from '../../../components/card-detailed/CardDetailed'

const CardPage = async ({ params: { id: cardId } }: { params: { id: string } }) => {
  const { contact, ...cards } = await getAllCards()
  const currentCard =
    cardId === 'contact'
      ? contact
      : Object.values(cards)
          .flat()
          .find((card) => card.id === cardId)!

  return (
    <div className="mt-8">
      <Link href="/">
        <div className="absolute flex justify-center items-center rounded-full top-2 right-2 w-12 h-12 bg-aptitud-light-grey">
          <span className="rounded-full bg-white w-8 h-8 flex justify-center items-center">
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </span>
        </div>
      </Link>
      <CardDetailed {...currentCard} />
    </div>
  )
}

export default CardPage
