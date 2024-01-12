'use client'

import Link from 'next/link'
import { Card } from './card/Card'
import { CardProps, FellowCardProps } from './card/types'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export const CardsGrid = ({ cards }: { cards: CardProps[] }) => {
  const [cardList, setCardList] = useState<CardProps[]>([])
  const searchParams = useSearchParams()
  const filter = searchParams.get('show') ?? ''

  function filterCards(items: CardProps[]) {
    const filtered = items.filter((item) => filter === '' || item.type === filter)
    setCardList(filtered)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const randomizeVideo = () => {
      const mode = new URLSearchParams(document.location.search).get('mode')
      const fellows = cards.filter((card) => card.type === 'fellow')
      const randomFellow = Math.floor(Math.random() * fellows.length)
      fellows.forEach((fellow, pos) => {
        ;(fellow as FellowCardProps).showVideo = mode == 'active' || pos === randomFellow
      })
      filterCards(cards)
      timeoutId = setTimeout(randomizeVideo, 3500)
    }

    filterCards(cards)
    randomizeVideo()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [filter])

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {cardList.map((card) => {
        return (
          <Link key={card.id} href={`/card/${card.id}`} passHref>
            <Card key={card.title} item={card} />
          </Link>
        )
      })}
    </div>
  )
}
