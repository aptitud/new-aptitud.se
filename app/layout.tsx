import './globals.css'
import { FilterMenu } from '../components/FilterMenu'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Aptitud',
  description: 'Enklare, gladare, roligare',
  icons: ['/favicon.ico'],
}

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={'bg-aptitud-gradient h-screen w-screen'}>
        <div className="w-11/12 max-w-7xl ml-auto mr-auto">
          <FilterMenu />
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
