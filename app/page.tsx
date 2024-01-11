import Image from 'next/image'
import { Card } from '../components/card/Card'
import { CardProps, FellowCardProps } from '../components/card/types'

import { useSearchParams } from 'next/navigation'
import { getAllCards } from '../lib/domain/cards'

const Home = async () => {
  // const [cardList, setCardList] = useState<JSX.Element[]>([])
  // const searchParams = useSearchParams()
  // const filter = searchParams?.get('show') ?? ''

  const cards = await getAllCards()

  // function filterCards(items: CardProps[]) {
  //   const filtered = items
  //     .filter((item) => filter === '' || item.type === filter)
  //     .map((item) => {
  //       return <Card key={item.title} item={item} />
  //     })
  //   setCardList(filtered)
  // }

  const items = randomizeOrder(cards.postsItems, cards.fellowItems, cards.instaItems)

  const cardList = items.map((item) => {
    return <Card key={item.title} item={item} />
  })

  // useEffect(() => {
  //   let timeoutId: NodeJS.Timeout | null = null

  //   const randomizeVideo = () => {
  //     const mode = new URLSearchParams(document.location.search).get('mode')
  //     const fellows = items.filter((item) => item.type === 'fellow')
  //     const randomFellow = Math.floor(Math.random() * fellows.length)
  //     fellows.forEach((fellow, pos) => {
  //       ;(fellow as FellowCardProps).showVideo = mode == 'active' || pos === randomFellow
  //     })
  //     filterCards(items)
  //     timeoutId = setTimeout(randomizeVideo, 3500)
  //   }

  //   filterCards(items)
  //   randomizeVideo()
  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId)
  //     }
  //   }
  // }, [filter])

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      <div className="w-full h-full col-span-2 md:col-span-3 xl:col-span-4 ml-auto mr-auto my-2">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-full m-auto">
            <Image
              priority
              src={'/logo.png'}
              height="302"
              width="500"
              alt="Aptitud"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
      {cardList}
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
