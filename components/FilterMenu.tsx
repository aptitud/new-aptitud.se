import { FilterMenuProps } from './card/types'
import { Contact } from './card/Contact'
import { useState } from 'react'
import {
  DoubleArrowRightIcon,
  StarIcon,
  InstagramLogoIcon,
  PersonIcon,
  FileTextIcon,
} from '@radix-ui/react-icons'

export const FilterMenu = ({ contact, setFilter, filter }: FilterMenuProps) => {
  function filterItems(filterItem: string) {
    if (filterItem === filter) {
      return setFilter('')
    }
    return setFilter(filterItem)
  }

  return (
    <nav>
      <div className="fixed top-8 left-0 z-10 group">
        <div className="flex">
          {filter !== '' && (
            <div className="bg-aptitud-petrol rounded-full h-3 w-3 absolute -right-1 -top-1 group-hover:invisible"></div>
          )}
          <div className="peer cursor-pointer rounded-tr-sm rounded-br-sm bg-white text-black p-3 bg-opacity-80 hover:bg-opacity-0">
            <DoubleArrowRightIcon />
          </div>
          <ul className="w-0 shadow-lg invisible rounded-tr-sm rounded-br-sm transition-all duration-500 peer-hover:w-36 peer-hover:visible hover:w-36 hover:visible absolute top-0 left-0 bg-white text-black p-3">
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
                <span className="mr-2 mt-2">
                  <FileTextIcon />
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
                <span className="mr-2 mt-2">
                  <PersonIcon />
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
                <span className="mr-2 mt-2">
                  <InstagramLogoIcon />
                </span>
                <span className="mt-1">Instagram</span>
              </div>
            </li>
            <li
              className={`p-0 md:pr-2 invisible w-0 group-hover:w-full group-hover:visible overflow-hidden hover:border-aptitud-petrol border-b-2 border-white`}
            >
              <div className="flex p-1" role={'button'}>
                <span className="mr-2 mt-2">
                  <StarIcon />
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
