import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { getAllCards } from '../../../lib/domain/cards'
import { DetailCard } from '../../../components/card/Card'
import Link from 'next/link'
import { ONE_HOUR_IN_SECONDS } from '../../../lib/consants'

export const revalidate = ONE_HOUR_IN_SECONDS

const CardPage = async ({ params: { id: cardId } }: { params: { id: string } }) => {
  const allCards = await getAllCards()

  const currentCard =
    cardId === 'contact'
      ? allCards.contact
      : [...allCards.posts, ...allCards.fellows, ...allCards.instaPosts].find((card) => card.id === cardId)!

  return (
    <div className="mt-8">
      <Link href="/">
        <div className="absolute flex justify-center items-center rounded-full top-2 right-2 w-12 h-12 bg-aptitud-light-grey">
          <span className="rounded-full bg-white w-8 h-8 flex justify-center items-center">
            <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
          </span>
        </div>
      </Link>
      <DetailCard {...currentCard} />
    </div>
  )
}

export default CardPage
