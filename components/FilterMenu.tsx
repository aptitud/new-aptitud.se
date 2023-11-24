import { FilterMenuProps } from './card/types'
import { Contact } from './card/Contact'
import { useRouter } from 'next/router'
import {
  HamburgerMenuIcon,
  StarIcon,
  InstagramLogoIcon,
  PersonIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'

export const FilterMenu = ({ contact }: FilterMenuProps) => {
  const router = useRouter()

  const searchParams = useSearchParams()
  const newParams = new URLSearchParams(searchParams.toString())
  const filter = searchParams.get('show') ?? ''

  function filterItems(filterItem: string) {
    if (filterItem === filter) {
      newParams.delete('show')
      router.push('')
    } else {
      newParams.set('show', filterItem)
      router.push('?' + newParams.toString())
    }
  }

  return (
    <nav>
      <div className="fixed right-0 top-60 md:top-8 md:left-0 md:right-auto z-30 group">
        <div className="flex">
          {filter !== '' && (
            <div className="bg-aptitud-petrol rounded-full h-3 w-3 absolute -right-1 -top-1 group-hover:invisible"></div>
          )}
          <div className="peer cursor-pointer rounded-tl-sm rounded-bl-sm md:rounded-tr-sm md:rounded-br-sm bg-white text-black p-3 bg-opacity-80 hover:bg-opacity-0">
            <HamburgerMenuIcon />
          </div>
          <ul className="w-0 shadow-lg invisible h-44 overflow-hidden rounded-tl-sm rounded-bl-sm md:rounded-tr-sm md:rounded-br-sm transition-all duration-500 peer-hover:w-36 peer-hover:visible hover:w-36 hover:visible absolute top-0 right-0 md:right-auto md:left-0 bg-white text-black p-3 text-md">
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
                onClick={() => filterItems('post')}
              >
                <span className="mr-2 mt-2 text-aptitud-petrol">
                  <FileTextIcon width={22} />
                </span>
                <span className="mt-1">Om oss</span>
              </div>
            </li>
            <li
              className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol ${
                filter === 'fellow'
                  ? 'border-b-2 border-aptitud-petrol'
                  : 'border-b-2 border-white'
              }`}
            >
              <div
                className="flex p-1"
                role={'button'}
                onClick={() => filterItems('fellow')}
              >
                <span className="mr-2 mt-2 text-aptitud-petrol">
                  <PersonIcon width={22} />
                </span>
                <span className="mt-1">Vilka är vi</span>
              </div>
            </li>
            <li
              className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol ${
                filter === 'aptigram'
                  ? 'border-b-2 border-aptitud-petrol'
                  : 'border-b-2 border-white'
              }`}
            >
              <div
                className="flex p-1"
                role={'button'}
                onClick={() => filterItems('aptigram')}
              >
                <span className="mr-2 mt-2 text-aptitud-petrol">
                  <InstagramLogoIcon width={22} />
                </span>
                <span className="mt-1">Instagram</span>
              </div>
            </li>
            <li
              className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol border-b-2 border-white`}
            >
              <div className="flex p-1" role={'button'}>
                <span className="mr-2 mt-2 text-aptitud-petrol">
                  <StarIcon width={22} />
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
  )
}
