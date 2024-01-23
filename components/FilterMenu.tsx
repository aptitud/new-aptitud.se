'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faFileLines, faUser, faStar } from '@fortawesome/free-regular-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { CardFilter } from '../lib/domain/cards'

export const FilterMenu = () => {
  const [isOpen, setOpen] = useState(false)
  const pathName = usePathname()

  function toggleMenu() {
    setOpen(!isOpen)
  }

  const filter = (filter: CardFilter) => {
    return `/cards/${filter}`
  }

  const isActive = /\/cards\/.+/i.test(pathName)

  return (
    <nav>
      <div
        className={`first:fixed right-0 top-60 md:top-8 md:left-0 md:right-auto z-30 rounded-tl-md rounded-bl-md md:rounded-tr-md md:rounded-br-md md:rounded-tl-none md:rounded-bl-none ${
          isOpen ? 'filter-menu--open' : 'filter-menu'
        }`}
      >
        <div className="flex">
          {isActive && !isOpen && (
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
            <Link href={pathName === filter('about') ? '/' : filter('about')}>
              <li
                className={`menu-item flex p-1 ${pathName === filter('about') ? ' menu-item--selected' : ''}`}
                role={'button'}
              >
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faFileLines} className="w-5 h-5" />
                </span>
                <span>Om oss</span>
              </li>
            </Link>
            <Link href={pathName === filter('fellows') ? '/' : filter('fellows')}>
              <li
                className={`menu-item flex p-1 ${pathName === filter('fellows') ? ' menu-item--selected' : ''}`}
                role={'button'}
              >
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                </span>
                <span>Vilka är vi</span>
              </li>
            </Link>
            <Link href={pathName === filter('instagram') ? '/' : filter('instagram')}>
              <li
                className={`menu-item flex p-1 ${pathName === filter('instagram') ? ' menu-item--selected' : ''}`}
                role={'button'}
              >
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                </span>
                <span>Instagram</span>
              </li>
            </Link>
            <Link href="/card/contact">
              <li className={`menu-item flex p-1`} role={'button'} onClick={() => setOpen(false)}>
                <span className="menu-icon">
                  <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
                </span>
                <span>Kontakt</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  )
}
