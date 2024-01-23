import { getAllCards } from '../../../../lib/domain/cards'
import { DetailCard } from '../../../../components/card/Card'
import Modal from './modal'
import { ONE_HOUR_IN_SECONDS } from '../../../../lib/consants'

export const revalidate = ONE_HOUR_IN_SECONDS

const CardModal = async ({ params: { id: cardId } }: { params: { id: string } }) => {
  const allCards = await getAllCards()

  const currentCard =
    cardId === 'contact'
      ? allCards.contact
      : [...allCards.posts, ...allCards.fellows, ...allCards.instaPosts].find((card) => card.id === cardId)!

  return (
    <Modal colorCode={currentCard.colorCode}>
      <DetailCard {...currentCard} />
    </Modal>
  )
}

export default CardModal
