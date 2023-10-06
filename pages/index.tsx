import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card, CardProps} from '../components/card/Card'
import { Contact, ContactCardProps } from '../components/card/Contact'
import { getFellows, getPosts, getContacts } from '../domain/contentful/service'
import { getInstagramPosts } from '../domain/instagram/service'

interface HomeProps {
  items: CardProps[],
  contact: ContactCardProps
}

const Home: NextPage<HomeProps> = ({ items, contact }) => {
  return (
    <div className="w-11/12 max-w-7xl ml-auto mr-auto">
      <Head>
        <title>Aptitud: Enklare, gladare, roligare</title>
        <meta name="description" content="Aptitud. Enklare, gladare, roligare" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
          <div className="w-full h-full col-span-2 md:col-span-3 xl:col-span-4 ml-auto mr-auto my-2">
            <div className="grid grid-cols-4 gap-4">
              <div></div>
              <div className="col-span-2 flex justify-center">
                <Image src={'/logo.svg'} height="302px" width="500px"/>
              </div>
              <div className='relative w-full h-full'>
                <div className="absolute bottom-0 right-0">
                  <Contact key={contact.title} item={contact} />
                </div>
              </div>
            </div>
          </div>
          {items.map((item) => {
            item
            return <Card key={item.title} item={item} />
          })}
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
const availableColors = [
  'aptitud-yellow',
  'aptitud-green',
  'aptitud-petrol',
  'aptitud-cerise',
  'aptitud-purple',
  'aptitud-blue_green',
  'aptitud-blue_dim',
]
const getRandomColor = (colors : string []): string => {

  return colors.sort(() => (Math.random() > 0.5 ? 1 : -1))[0]
}

const randomizeOrder =  (postsItems: CardProps[], fellowItems: CardProps[]): CardProps[]  => {
  fellowItems.sort(() => (Math.random() > 0.5 ? 1 : -1))
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

  const contacts =  await getContacts()
  
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
    colorCode: getRandomColor(availableColors),
    socialLinks: fellow.services,
    onKeyDown: null,
    video: fellow.video ? fellow.video?.fields.file.url : null
  }))

  const postsItems: CardProps[] = sortedPosts.map((post) => ({
    title: post.title,
    type: 'post',
    text: post.description,
    image: post.image ? post.image?.fields.file.url : null,
    colorCode: getRandomColor(availableColors),
    postContent: post.postContent ? post.postContent : '',
    onKeyDown: null
  }))

  const contactItems: ContactCardProps[] = contacts.map((contact) => ({
    title: contact.header,
    summaryTitle: contact.summaryHeader? contact.summaryHeader : '',
    type: 'contact',
    text: contact.visitingAddress ? contact.visitingAddress : '',
    image: contact.image ? contact.image?.fields.file.url : null,
    colorCode: getRandomColor(availableColors),
    onKeyDown: null
  }))

  const items = randomizeOrder(postsItems, fellowItems)
  const insta = await getInstagramPosts();

  const instaPosts: CardProps[] = insta.map((post : any) => ({
    title: post.permalink,
    type: 'aptigram',
    text: post.caption || '',
    image: post.media_url ? post.media_url : null,
    colorCode: getRandomColor(availableColors.filter(color => color !== 'aptitud-yellow')),
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
