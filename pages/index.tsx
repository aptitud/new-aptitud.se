import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card } from '../components/card/Card'
import { FilterMenu } from '../components/FilterMenu'
import { CardProps, FellowCardProps } from '../components/card/types'
import { ContactCardProps } from '../components/card/Contact'
import { getFellows, getPosts, getContacts } from '../domain/contentful/service'
import { useEffect, useState } from 'react'

import { getInstagramPosts } from '../domain/instagram/service'
import { useSearchParams } from 'next/navigation'

interface HomeProps {
  items: CardProps[]
  contact: ContactCardProps
}

const Home: NextPage<HomeProps> = ({ items, contact }) => {
  const [cardList, setCardList] = useState<JSX.Element[]>([])
  const searchParams = useSearchParams()
  const filter = searchParams.get('show') ?? ''

  function filterCards(items: CardProps[]) {
    const filtered = items
      .filter((item) => filter === '' || item.type === filter)
      .map((item) => {
        return <Card key={item.title} item={item} />
      })
    setCardList(filtered)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const randomizeVideo = () => {
      const mode = new URLSearchParams(document.location.search).get('mode')
      const fellows = items.filter((item) => item.type === 'fellow')
      const randomFellow = Math.floor(Math.random() * fellows.length)
      fellows.forEach((fellow, pos) => {
        ;(fellow as FellowCardProps).showVideo =
          mode == 'active' || pos === randomFellow
      })
      filterCards(items)
      timeoutId = setTimeout(randomizeVideo, 3500)
    }

    filterCards(items)
    randomizeVideo()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [filter])

  return (
    <div className="w-11/12 max-w-7xl ml-auto mr-auto">
      <Head>
        <title>Aptitud: Enklare, gladare, roligare</title>
        <meta
          name="description"
          content="Aptitud. Enklare, gladare, roligare"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FilterMenu contact={contact} />
      <main>
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
      </main>
      <footer>
        <div className="w-full">
          <span className="h-full p-4 m-4">&nbsp;</span>
        </div>
      </footer>
    </div>
  )
}
const availableColors = [
  'aptitud-yellow',
  'aptitud-green',
  'aptitud-petrol',
  'aptitud-purple',
  'aptitud-blue_dim',
]
const getRandomColor = (colors: string[]): string => {
  return colors.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]
}

const randomizeOrder = (
  postsItems: CardProps[],
  fellowItems: CardProps[],
  aptigramItems: CardProps[]
): CardProps[] => {
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
  } while (
    fellowItems.length > 0 ||
    postsItems.length > 0 ||
    aptigramItems.length > 0
  )

  return randomItems
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const fellows = await getFellows()

  const posts = await getPosts()

  const contacts = await getContacts()

  const sortedPosts = posts
    .sort((a, b) => {
      if (a.sticky != b.sticky) {
        return a.sticky ? -1 : 1
      }
      return Date.parse(b.ts) - Date.parse(a.ts)
    })
    .reverse()

  const fellowItems: CardProps[] = fellows.map((fellow) => ({
    title: fellow.name,
    type: 'fellow',
    text: fellow.description,
    image: fellow.image ? fellow.image?.fields.file.url : null,
    colorCode: getRandomColor(availableColors),
    socialLinks: fellow.services,
    onKeyDown: null,
    video: fellow.video ? fellow.video?.fields.file.url : null,
    showVideo: false,
  }))

  const postsItems: CardProps[] = sortedPosts.map((post) => ({
    title: post.title,
    type: 'post',
    text: post.description,
    image: post.image ? post.image?.fields.file.url : null,
    colorCode: getRandomColor(availableColors),
    postContent: post.postContent ? post.postContent : '',
    onKeyDown: null,
  }))

  const contactItems: ContactCardProps[] = contacts.map((contact) => ({
    title: contact.header,
    summaryTitle: contact.summaryHeader ? contact.summaryHeader : '',
    type: 'contact',
    text: contact.visitingAddress ? contact.visitingAddress : '',
    image: contact.image ? contact.image?.fields.file.url : null,
    colorCode: getRandomColor(availableColors),
    onKeyDown: null,
  }))

  const insta = await getInstagramPosts()

  const instaPosts: CardProps[] = insta.map((post: any) => ({
    title: post.permalink,
    type: 'aptigram',
    text: post.caption || '',
    image: post.media_url ? post.media_url : null,
    thumbnail: post.thumbnail_url || '',
    permalink: post.permalink || '',
    colorCode: getRandomColor(availableColors),
    onKeyDown: null,
  }))

  const items = randomizeOrder(postsItems, fellowItems, instaPosts)

  return {
    props: {
      items,
      contact: contactItems[0],
    },
  }
}

export default Home
