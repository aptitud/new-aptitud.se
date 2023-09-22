import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card, CardProps } from '../components/card/Card'
import { getFellows, getPosts } from '../domain/contentful/service'

interface HomeProps {
  items: CardProps[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
  return (
    <div className="w-10/12 max-w-7xl ml-auto mr-auto">
      <Head>
        <title>Aptitud: Enklare, gladare, roligare</title>
        <meta name="description" content="Aptitud. Enklare, gladare, roligare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="col-span-2 xl:col-span-4 ml-auto mr-auto my-2">
            <Image src={'/logo.png'} height="210px" width="300px" />
          </div>
          {items.map((item) => {
            item
            return <Card key={item.title} item={item} />
          })}
        </div>
      </main>
    </div>
  )
}

const getRandomColor = (): string => {
  const colors = [
    'aptitud-pink-red',
    'aptitud-cerise',
    'aptitud-orange',
    'aptitud-yellow',
    'aptitud-pink',
    'aptitud-green',
    'aptitud-petrol',
    'aptitud-blue_green',
    'aptitud-blue_dim',
  ]
  return colors.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]
}

const randomizeOrder =  (postsItems: CardProps[], fellowItems: CardProps[]): CardProps[]  => {
  const fivePosts = postsItems.splice(0, postsItems.length > 5 ? 5 : postsItems.length)

  const fiveFellows = fellowItems
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .splice(0, 5)

  const items = fiveFellows
    .concat(fivePosts)
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .concat(fellowItems.concat(postsItems).sort(() => (Math.random() > 0.5 ? 1 : -1)))
  return items
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const fellows = await getFellows()

  const posts = await getPosts()
  
  const sortedPosts = posts
    .sort((a, b) => Date.parse(a.ts) - Date.parse(b.ts))

  const fellowItems: CardProps[] = fellows.map((fellow) => ({
    title: fellow.name,
    type: 'fellow',
    text: fellow.description,
    image: fellow.image ? fellow.image?.fields.file.url : null,
    colorCode: getRandomColor(),
    socialLinks: fellow.services,
  }))

  const postsItems: CardProps[] = sortedPosts.map((post) => ({
    title: post.title,
    type: 'post',
    text: post.description,
    image: post.image ? post.image?.fields.file.url : null,
    colorCode: getRandomColor(),
  }))

  const items = randomizeOrder(postsItems, fellowItems)

  return {
    props: { items },
  }
}



export default Home
