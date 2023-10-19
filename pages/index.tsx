import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from "next/image"
import { Card } from '../components/card/Card'
import { CardProps, FellowCardProps } from '../components/card/types'
import { Contact, ContactCardProps } from '../components/card/Contact'
import { getFellows, getPosts, getContacts } from '../domain/contentful/service'
import { useEffect, useState } from 'react'
import {
  DoubleArrowRightIcon,
  StarIcon,
  InstagramLogoIcon,
  PersonIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'

import { getInstagramPosts } from '../domain/instagram/service'

interface HomeProps {
  items: CardProps[]
  contact: ContactCardProps
}

const Home: NextPage<HomeProps> = ({ items, contact }) => {
  const [filter, setFilter] = useState('')
  const [cardList, setCardList] = useState<JSX.Element[]>([])

  function filterCards(items: CardProps[]) {
    const filtered = items
    .filter((item) => filter === '' || item.type === filter)
    .map((item) => {
      return <Card key={item.title} item={item} />
    })
    setCardList(filtered)
  }

  function clickHandler(filterItem: string) {
    if (filterItem === filter) {
      return setFilter('')
    }
    return setFilter(filterItem)
  }

  

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const randomizeVideo = () => {
      const mode = new URLSearchParams(document.location.search).get('mode');
      const fellows = items.filter((item) => item.type === 'fellow');
      const randomFellow = Math.floor(Math.random() * fellows.length);
      fellows.forEach((fellow, pos) => {
        (fellow as FellowCardProps).showVideo = ( mode == 'active' ||  pos===randomFellow)
      });
      filterCards(items)
      timeoutId = setTimeout(randomizeVideo, 3250)
    }

    filterCards(items)
    randomizeVideo()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    } 
  }, [filter]);

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
      <nav>
        <div className="fixed top-8 left-0 z-10 group">
          <div className="flex">
            {filter !== '' && (
              <div className="bg-aptitud-petrol rounded-full h-3 w-3 absolute -right-1 -top-1"></div>
            )}
            <div className="peer cursor-pointer rounded-tr-sm rounded-br-sm bg-white text-black p-3 bg-opacity-80 hover:bg-opacity-0">
              <DoubleArrowRightIcon />
            </div>
            <ul className="w-0 shadow-lg invisible rounded-tr-sm rounded-br-sm transition-all duration-500 peer-hover:w-36 peer-hover:visible hover:w-36 hover:visible absolute top-0 left-0 bg-white text-black p-3">
              <li
                className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol ${
                  filter === 'post'
                    ? ' border-b-2 border-aptitud-petrol'
                    : 'border-b-2 border-white'
                }`}
              >
                <div
                  className="flex p-1"
                  role={'button'}
                  onClick={() => clickHandler('post')}
                >
                  <span className="mr-2 mt-2">
                    <FileTextIcon />
                  </span>
                  <span className='mt-1' >
                    Om oss
                  </span>
                </div></li>
              <li className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol ${filter === 'fellow' ? 'border-b-2 border-aptitud-petrol' : 'border-b-2 border-white'}`}>
                <div className='flex p-1' role={'button'} onClick={() => clickHandler('fellow')}>
                  <span className='mr-2 mt-2' >
                    <PersonIcon />
                  </span>
                  <span className='mt-1' >
                    Vilka är vi
                  </span>
                </div></li>
              <li className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol ${filter === 'aptigram' ? 'border-b-2 border-aptitud-petrol' : 'border-b-2 border-white'}`}>
                <div className='flex p-1' role={'button'} onClick={() => clickHandler('aptigram')}>
                  <span className='mr-2 mt-2' >
                    <InstagramLogoIcon />
                  </span>
                  <span className="mt-1">Instagram</span>
                </div>
              </li>
              <li
                className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol border-b-2 border-white`}
              >
                <div className="flex p-1" role={'button'}>
                  <span className="mr-2 mt-2">
                    <StarIcon />
                  </span>
                  <span className="mt-1">
                    <Contact key={contact.title} item={contact} />
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </div>
            </div>
          </div>
          { cardList }
        </div>
      </main>
      <footer>
        <div className="w-full">
          <span className="h-full p-4 m-4">&nbsp;</span>
        </div>
      </footer>
    </div>
  );
}
const availableColors = [
  'aptitud-yellow',
  'aptitud-green',
  'aptitud-petrol',
  'aptitud-purple',
  'aptitud-blue_green',
  'aptitud-blue_dim',
]
const getRandomColor = (colors: string[]): string => {
  return colors.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]
}

const randomizeOrder = (
  postsItems: CardProps[],
  fellowItems: CardProps[]
): CardProps[] => {
  fellowItems.sort(() => (Math.random() > 0.5 ? 1 : -1))
  let offset = 0

  do {
    const seed = Math.floor(Math.random() * 3) + offset

    fellowItems.splice(
      seed >= fellowItems.length ? fellowItems.length - 1 : seed,
      0,
      postsItems.pop() as CardProps
    )
    offset += 4
  } while (offset < fellowItems.length && postsItems.length > 0)

  fellowItems.push(...postsItems.reverse())
  return fellowItems
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
    showVideo:false
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

  const items = randomizeOrder(postsItems, fellowItems)
  const insta = await getInstagramPosts()

  const instaPosts: CardProps[] = insta.map((post: any) => ({
    title: post.permalink,
    type: 'aptigram',
    text: post.caption || '',
    image: post.media_url ? post.media_url : null,
    colorCode: getRandomColor(
      availableColors.filter((color) => color !== 'aptitud-yellow')
    ),
    thumbnail: post.thumbnail_url || '',
    permalink: post.permalink || '',
  }))

  items.push(...instaPosts)

  return {
    props: {
      items,
      contact: contactItems[0],
    },
  }
}

export default Home
