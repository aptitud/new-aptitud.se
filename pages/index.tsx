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
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    <div className="col-span-2 xl:col-span-4 ml-auto mr-auto my-2">
                        <Image src={'/logo.png'} height="210px" width="300px" />
                    </div>
                    {items.map((item) => (
                        <Card
                            title={item.title}
                            text={item.text}
                            image={item.image}
                            key={item.title}
                            colorCode={item.colorCode}
                        />
                    ))}
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const fellows = await getFellows()
    const posts = await getPosts()
    const items: CardProps[] = fellows
        .map((fellow) => ({
            title: fellow.name,
            text: fellow.description,
            image: fellow.image ? fellow.image?.fields.file.url : null,
            colorCode: getRandomColor(),
        }))
        .concat(
            posts.map((post) => ({
                title: post.title,
                text: post.description,
                image: post.image ? post.image?.fields.file.url : null,
                colorCode: getRandomColor(),
            }))
        )
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
    return {
        props: { items },
    }
}

export default Home
