import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Card, CardProps } from '../components/card/Card'
import { getFellows, getPosts } from '../domain/contentful/service'
import styles from '../styles/Home.module.css'

interface HomeProps {
    items: CardProps[]
}

const Home: NextPage<HomeProps> = ({ items }) => {
    console.log({ items })
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
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4 ml-auto mr-auto my-2">
                        <Image src={'/logo.png'} height="210px" width="300px" />
                    </div>
                    {items.map((item) => (
                        <Card
                            title={item.title}
                            text={item.text}
                            image={item.image}
                            key={item.title}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const fellows = await getFellows()
    const posts = await getPosts()
    const items: CardProps[] = fellows
        .map(({ name, description, image }) => ({
            title: name,
            text: description,
            image: image?.fields.file.url,
        }))
        .concat(
            posts.map(({ title, description, image }) => ({
                title,
                text: description,
                image: image?.fields.file.url,
            }))
        )
        .sort(() => (Math.random() > 0.5 ? 1 : -1))
    return {
        props: { items },
    }
}

export default Home
