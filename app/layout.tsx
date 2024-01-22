import './globals.css'
import { FilterMenu } from '../components/FilterMenu'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCards } from '../lib/domain/cards'

export const metadata: Metadata = {
  title: 'Aptitud',
  description: 'Enklare, gladare, roligare',
  icons: ['/favicon.ico'],
}

export const revalidate = 3600 // revalidate the data at most every hour

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const { contact } = await getAllCards()

  return (
    <html lang="en">
      <body className={'bg-aptitud-gradient h-screen w-screen'}>
        <div className="w-11/12 max-w-7xl ml-auto mr-auto">
          <FilterMenu contact={contact} />
          <main>
            <div className="flex justify-center">
              <Link href="/">
                <Image priority src={'/logo.png'} height={303} width={500} alt="Aptitud" className="m-4" />
              </Link>
            </div>
            {children}
            {modal}
          </main>
          <footer>
            <div className="w-full h-8"></div>
          </footer>
        </div>
      </body>
    </html>
  )
}
