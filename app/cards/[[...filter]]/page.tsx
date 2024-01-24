import { CardsGrid } from '../../../components/CardsGrid'
import { AptigramCardProps, CardProps, FellowCardProps, PostsCardProps } from '../../../lib/domain/types'
import { CardFilter, cardFilterMapping, getAllCards } from '../../../lib/domain/cards'

export default async function Cards({ params }: { params: { filter: CardFilter } }) {
  const { filter } = params

  const { contact, ...cards } = await getAllCards()

  const filteredCards = cards[cardFilterMapping[filter]]
  const randomizedCards = filteredCards
    ? randomizeOrder(filteredCards)
    : randomizeOrder([...cards.fellows, ...cards.posts, ...cards.instaPosts])

  return <CardsGrid cards={randomizedCards} />
}

const randomizeOrder = (cards?: CardProps[]): CardProps[] => {
  const fellowItems = cards?.filter((card) => card.type === 'fellow') as FellowCardProps[] | undefined
  const postsItems = cards?.filter((card) => card.type === 'post') as PostsCardProps[] | undefined
  const aptigramItems = cards?.filter((card) => card.type === 'aptigram') as AptigramCardProps[] | undefined

  const randomItems: CardProps[] = []

  // Separate sticky and non-sticky items
  const separateSticky = (items: PostsCardProps[] = []) => {
    const stickyItems = items.filter((item) => item.sticky)
    const nonStickyItems = items.filter((item) => !item.sticky)
    return { stickyItems, nonStickyItems }
  }

  const { stickyItems: stickyPosts, nonStickyItems: nonStickyPosts } = separateSticky(postsItems)

  while (fellowItems?.length || stickyPosts?.length || nonStickyPosts?.length || aptigramItems?.length) {
    if (stickyPosts?.length) {
      const index = Math.floor(Math.random() * stickyPosts.length)
      randomItems.push(...stickyPosts.splice(index, 1))
      continue
    }
    if (fellowItems?.length) {
      const index = Math.floor(Math.random() * fellowItems.length)
      randomItems.push(...fellowItems.splice(index, 1))
    }
    if (nonStickyPosts.length) {
      const index = Math.floor(Math.random() * nonStickyPosts.length)
      randomItems.push(...nonStickyPosts.splice(index, 1))
    }
    if (aptigramItems?.length) {
      const index = Math.floor(Math.random() * aptigramItems.length)
      randomItems.push(...aptigramItems.splice(index, 1))
    }
  }

  return randomItems
}
