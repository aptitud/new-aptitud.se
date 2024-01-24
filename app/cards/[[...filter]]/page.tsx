import { CardsGrid } from '../../../components/CardsGrid'
import { CardProps } from '../../../lib/domain/types'
import { CardFilter, cardFilterMapping, getAllCards } from '../../../lib/domain/cards'

export default async function Cards({ params }: { params: { filter: CardFilter } }) {
  const { filter } = params

  const { contact, ...cards } = await getAllCards()

  const filteredCards = cards[cardFilterMapping[filter]]
  const randomizedCards = filteredCards
    ? randomizeOrder(filteredCards)
    : randomizeOrder(cards.fellows, cards.posts, cards.instaPosts)

  return <CardsGrid cards={randomizedCards} />
}

const randomizeOrder = (
  fellowItems?: CardProps[],
  postsItems?: CardProps[],
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

  console.log(randomItems.map((item) => item.type))

  return randomItems
}
