import { getAllCards } from '../../../../lib/domain/cards'
import { DetailCard } from '../../../../components/card/Card'
import Modal from './modal'

const CardModal = async ({ params: { id: cardId } }: { params: { id: string } }) => {
  const allCards = await getAllCards()
  const currentCard = [...allCards.postsItems, ...allCards.fellowItems, ...allCards.instaItems].find(
    (card) => card.id === cardId
  )!
  return (
    <Modal colorCode={currentCard.colorCode}>
      <DetailCard {...currentCard} />
    </Modal>
  )
}

export default CardModal
