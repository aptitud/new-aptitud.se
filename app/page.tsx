import Image from 'next/image'
import { getAllCards } from '../lib/domain/cards'
import { CardsGrid } from '../components/CardsGrid'
import { CardProps } from '../components/card/types'

const Home = async () => {
  const cards = await getAllCards()
  const randomizedCards = randomizeOrder(cards.postsItems, cards.fellowItems, cards.instaItems)

  return (
    <div>
      <div className="flex justify-center">
        <Image priority src={'/logo.png'} height={303} width={500} alt="Aptitud" className="m-4" />
      </div>
      <CardsGrid cards={randomizedCards} />
    </div>
  )
}

const randomizeOrder = (postsItems: CardProps[], fellowItems: CardProps[], aptigramItems: CardProps[]): CardProps[] => {
  fellowItems.sort(() => (Math.random() > 0.5 ? 1 : -1))
  const randomItems = [] as CardProps[]

  do {
    const row = [] as any
    if (fellowItems?.length) row.push(fellowItems.pop())
    if (fellowItems?.length) row.push(fellowItems.pop())
    if (postsItems?.length) row.push(postsItems.pop())
    if (aptigramItems?.length) row.push(aptigramItems.pop())

    row.sort(() => (Math.random() > 0.5 ? 1 : -1))
    randomItems.push(...row)
  } while (fellowItems.length > 0 || postsItems.length > 0 || aptigramItems.length > 0)

  return randomItems
}

export default Home
