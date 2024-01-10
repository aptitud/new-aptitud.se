import { FilterMenuProps } from './card/types'
import { Contact } from './card/Contact'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSearchParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFileLines, faUser, faStar } from '@fortawesome/free-regular-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

export const FilterMenu = ({ contact }: FilterMenuProps) => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
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

  function toggleMenu() {
    setOpen(!isOpen)
  }

  return (
    <nav>
      <div
        className={`first:fixed right-0 top-60 md:top-8 md:left-0 md:right-auto z-30 rounded-tl-md rounded-bl-md md:rounded-tr-md md:rounded-br-md md:rounded-tl-none md:rounded-bl-none ${
          isOpen ? 'filter-menu--open' : 'filter-menu'
        }`}
      >
        <div className="flex">
          {filter !== '' && !isOpen && (
            <div className="bg-aptitud-petrol rounded-full h-3 w-3 absolute -right-1 -top-1"></div>
          )}
          <div className="p-3 order-2 cursor-pointer" onClick={() => toggleMenu()}>
            {isOpen ? (
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            ) : (
              <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
            )}
          </div>
          <ul className={isOpen ? 'menu-list menu-list--open' : 'menu-list'}>
            <li
              className={`menu-item flex p-1 ${filter === 'post' ? ' menu-item--selected' : ''}`}
              role={'button'}
              onClick={() => filterItems('post')}
            >
              <span className="menu-icon">
                <FontAwesomeIcon icon={faFileLines} className="w-5 h-5" />
              </span>
              <span>Om oss</span>
            </li>
            <li
              className={`menu-item flex p-1 ${filter === 'fellow' ? 'menu-item--selected' : ''}`}
              role={'button'}
              onClick={() => filterItems('fellow')}
            >
              <span className="menu-icon">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              </span>
              <span>Vilka är vi</span>
            </li>
            <li
              className={`menu-item flex p-1 ${filter === 'aptigram' ? ' menu-item--selected' : ''}`}
              role={'button'}
              onClick={() => filterItems('aptigram')}
            >
              <span className="menu-icon">
                <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
              </span>
              <span>Instagram</span>
            </li>
            <li className={`menu-item flex p-1`} role={'button'} onClick={() => setOpen(false)}>
              <span className="menu-icon">
                <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
              </span>
              <span>
                <Contact key={contact.title} item={contact} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
