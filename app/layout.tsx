import { getContacts } from '../lib/domain/contentful/service'
import { FilterMenu } from '../components/FilterMenu'
import { Metadata } from 'next'
import './globals.css'
import { ContactCardProps } from '../components/card/types'

export const metadata: Metadata = {
  title: 'Aptitud',
  description: 'Enklare, gladare, roligare',
  icons: ['/favicon.ico'],
}

export const revalidate = 3600 // revalidate the data at most every hour

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contacts = await getContacts()
  const contactItems: ContactCardProps[] = contacts.map((contact) => ({
    title: contact.header,
    summaryTitle: contact.summaryHeader ? contact.summaryHeader : '',
    type: 'contact',
    text: contact.visitingAddress ? contact.visitingAddress : '',
    image: contact.image ? contact.image?.fields.file.url : null,
    colorCode: 'aptitud-blue_green',
    onKeyDown: null,
  }))
  const contact = contactItems[0]

  return (
    <html lang="en">
      <body className={'bg-aptitud-gradient h-screen w-screen'}>
        <div className="w-11/12 max-w-7xl ml-auto mr-auto">
          <FilterMenu contact={contact} />
          <main>{children}</main>
          <footer>
            <div className="w-full h-8"></div>
          </footer>
        </div>
      </body>
    </html>
  )
}
