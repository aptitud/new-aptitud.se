import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card, CardProps} from '../components/card/Card'
import { Contact, ContactCardProps } from '../components/card/Contact'
import { getFellows, getPosts, getContacts } from '../domain/contentful/service'
import { useState } from 'react'
import { DoubleArrowRightIcon } from '@radix-ui/react-icons'

import { getInstagramPosts } from '../domain/instagram/service'
import { randomUUID } from 'crypto'

interface HomeProps {
  items: CardProps[],
  contact: ContactCardProps
}

const Home: NextPage<HomeProps> = ({ items, contact }) => {

  const [filter, setFilter] = useState('')

  function filteredCards(items: CardProps[]): JSX.Element[] {
    
    const filtered =  items
        .filter(item => filter === '' || item.type === filter)
        .map((item) => {
          return <Card key={item.title} item={item} />
        })
    return filtered;
  }

  function clickHandler(filterItem: string) {
    if (filterItem === filter) {
      return setFilter('')
    }
    return setFilter(filterItem);
  }

  return (
    <div className="w-10/12 max-w-7xl ml-auto mr-auto">{/*  */}
      <Head>
        <title>Aptitud: Enklare, gladare, roligare</title>
        <meta name="description" content="Aptitud. Enklare, gladare, roligare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="w-full h-full col-span-2 xl:col-span-4 ml-auto mr-auto my-2">
            <div className="grid grid-cols-4 gap-4">
              <div className='fixed top-8 left-0'>
                <div className='flex'>
                  <div className='peer cursor-pointer rounded-tr-sm rounded-br-sm bg-white text-black p-3 bg-opacity-80 hover:bg-opacity-0'><DoubleArrowRightIcon /></div>
                  <ul className='w-0 invisible rounded-tr-sm rounded-br-sm transition-all peer-hover:w-60 peer-hover:visible peer-hover:z-1 hover:w-36 hover:visible absolute top-0 left-0 bg-white text-black p-3'>
                    <li className={`p-0 md:pr-2 ${filter === 'post' ? ' border-b-2 border-aptitud-petrol' : 'border-b-2 border-white'}`}>
                      <div className='flex p-1' role={'button'} onClick={() => clickHandler('post')} >
                      <span className='mr-2 mt-2' >
                        <svg className="h-4 w-4 text-white-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </span>
                      <span className='hidden md:block truncate mt-1' >
                        Om oss
                      </span>
                    </div></li>
                    <li className={`p-0 md:pr-2  ${filter === 'fellow' ? 'border-b-2 border-aptitud-petrol' : 'border-b-2 border-white'}`}>
                      <div className='flex p-1'  role={'button'} onClick={() => clickHandler('fellow')}>
                      <span className='mr-2 mt-2' >
                        <svg className="h-4 w-4 text-white-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </span>
                      <span className='hidden md:block truncate mt-1' >
                        Konsulter
                      </span>
                    </div></li>
                    <li className={`p-0 md:pr-2 ${filter === 'aptigram' ? 'border-b-2 border-aptitud-petrol' : 'border-b-2 border-white'}`}>
                      <div className='flex p-1' role={'button'} onClick={() => clickHandler('aptigram')}>
                      <span className='mr-2 mt-2'>
                        <svg className="h-4 w-4 text-white-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round">  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                      </span>
                      <span className='hidden md:block truncate mt-1' >
                        Instagram
                      </span>
                    </div></li>
                  </ul>
                </div>
              </div>
              <div className='col-span-1'></div>
              <div className="col-span-2 m-auto">
                <Image src={'/logo.svg'} height="302px" width="500px" />
              </div>
              <div className='relative w-full h-full mt-2'>
                <div className="absolute top-2 right-0">
                  <Contact key={contact.title} item={contact} />
                </div>
              </div>
            </div>
          </div>
          {filteredCards(items)}
        </div>
      </main>
      <footer>
        <div className="w-full">
          <span className='h-full p-4 m-4'>&nbsp;</span>
        </div>
      </footer>
    </div>
  )
}

const getRandomColor = (): string => {
  const colors = [
    'aptitud-yellow',
    'aptitud-green',
    'aptitud-petrol',
    'aptitud-blue_green',
    'aptitud-blue_dim',
  ]
  return colors.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]
}

const randomizeOrder =  (postsItems: CardProps[], fellowItems: CardProps[]): CardProps[]  => {
  let offset = 0;
  do {
   const seed = Math.floor(Math.random() * 3)+offset
  
   fellowItems.splice(seed >= fellowItems.length ? fellowItems.length-1 : seed , 0, postsItems.pop() as CardProps)
   offset += 4
  } while(offset < fellowItems.length && postsItems.length > 0)
 
   fellowItems.push(...postsItems.reverse())
   return fellowItems
 
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {

  const fellows = await getFellows()

  const posts = await getPosts()

  const contacts = await getContacts()

  const sortedPosts = posts
    .sort((a, b) => {
     if(a.sticky != b.sticky) {
      return a.sticky ? -1 : 1; 
     } 
     return Date.parse(b.ts) - Date.parse(a.ts)
    }).reverse()

  const fellowItems: CardProps[] = fellows.map((fellow) => ({
    title: fellow.name,
    type: 'fellow',
    text: fellow.description,
    image: fellow.image ? fellow.image?.fields.file.url : null,
    colorCode: getRandomColor(),
    socialLinks: fellow.services,
    onKeyDown: null
  }))

  const postsItems: CardProps[] = sortedPosts.map((post) => ({
    title: post.title,
    type: 'post',
    text: post.description,
    image: post.image ? post.image?.fields.file.url : null,
    colorCode: getRandomColor(),
    postContent: post.postContent ? post.postContent : '',
    onKeyDown: null
  }))

  const contactItems: ContactCardProps[] = contacts.map((contact) => ({
    title: contact.header,
    summaryTitle: contact.summaryHeader ? contact.summaryHeader : '',
    type: 'contact',
    text: contact.visitingAddress ? contact.visitingAddress : '',
    image: contact.image ? contact.image?.fields.file.url : null,
    colorCode: getRandomColor(),
    onKeyDown: null
  }))

  const items = randomizeOrder(postsItems, fellowItems)
  const insta = await getInstagramPosts();

  const instaPosts: CardProps[] = insta.map((post : any) => ({
    title: post.permalink,
    type: 'aptigram',
    text: post.caption || '',
    image: post.media_url ? post.media_url : null,
    colorCode: '',
    thumbnail: post.thumbnail_url || '',
    permalink: post.permalink || ''
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
