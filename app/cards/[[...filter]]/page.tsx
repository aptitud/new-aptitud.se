import { CardsGrid } from '../../../components/CardsGrid'
import { CardProps } from '../../../lib/domain/types'
import { ONE_HOUR_IN_SECONDS } from '../../../lib/consants'
import { CardFilter, cardFilterMapping, getAllCards } from '../../../lib/domain/cards'

export const revalidate = ONE_HOUR_IN_SECONDS

export default async function Cards({ params }: { params: { filter: CardFilter } }) {
  const { filter } = params

  const { contact, ...cards } = await getAllCards()

  const filteredCards = cards[cardFilterMapping[filter]] || Object.values(cards).flat()
  const randomizedCards = randomizeOrder(filteredCards)

  return <CardsGrid cards={randomizedCards} />
}

const randomizeOrder = (
  postsItems?: CardProps[],
  fellowItems?: CardProps[],
  aptigramItems?: CardProps[]
): CardProps[] => {
  const randomItems: CardProps[] = []

  while (fellowItems?.length || postsItems?.length || aptigramItems?.length) {
    if (fellowItems?.length) {
      const index = Math.floor(Math.random() * fellowItems.length)
      randomItems.push(...fellowItems.splice(index, 1))
    }
    if (postsItems?.length) {
      const index = Math.floor(Math.random() * postsItems.length)
      randomItems.push(...postsItems.splice(index, 1))
    }
    if (aptigramItems?.length) {
      const index = Math.floor(Math.random() * aptigramItems.length)
      randomItems.push(...aptigramItems.splice(index, 1))
    }
  }

  return randomItems
}
