import { getAllCards } from '../../../../lib/domain/cards'
import Modal from './modal'
import { CardDetailed } from '../../../../components/card-detailed/CardDetailed'

const CardModal = async ({ params: { id: cardId } }: { params: { id: string } }) => {
  const { contact, ...cards } = await getAllCards()
  const currentCard =
    cardId === 'contact'
      ? contact
      : Object.values(cards)
          .flat()
          .find((card) => card.id === cardId)!

  return (
    <Modal colorCode={currentCard.colorCode}>
      <CardDetailed {...currentCard} />
    </Modal>
  )
}

export default CardModal
