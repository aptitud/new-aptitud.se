import './globals.css'
import { FilterMenu } from '../components/FilterMenu'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Shantell_Sans } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Aptitud',
  description: 'Enklare, gladare, roligare',
  icons: ['/favicon.ico'],
}

const shantell_sans = Shantell_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-shantell-sans',
})

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <html lang="en" className={`${shantell_sans.variable}`}>
      <body className={'bg-aptitud-gradient h-screen w-screen'}>
        <div className="w-11/12 max-w-7xl ml-auto mr-auto">
          <FilterMenu />
          <main>
            <div className="flex justify-center m-4 md:m-8">
              <Link href="/">
                <Image priority src={'/logo.png'} height={303} width={500} alt="Aptitud" />
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
