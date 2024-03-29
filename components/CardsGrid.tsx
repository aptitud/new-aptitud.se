'use client'

import Link from 'next/link'
import { Card } from './card/Card'
import { CardProps, FellowCardProps } from '../lib/domain/types'
import { useState, useEffect } from 'react'

export const CardsGrid = ({ cards }: { cards: CardProps[] }) => {
  const [cardList, setCardList] = useState<CardProps[]>(cards)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const randomizeVideo = (previousFellowIndex?: number) => {
      const fellows = cardList.filter((card) => card.type === 'fellow')

      if (!fellows.length) {
        return
      }

      const randomFellow = fellows[Math.floor(Math.random() * fellows.length)]
      const randomFellowIndex = cardList.findIndex((card) => card.id === randomFellow.id)

      if (randomFellowIndex) {
        setCardList((prevCardList) => {
          const newCardList = [...prevCardList]
          newCardList[randomFellowIndex] = { ...(prevCardList[randomFellowIndex] as FellowCardProps), showVideo: true }
          if (previousFellowIndex) {
            newCardList[previousFellowIndex] = {
              ...(prevCardList[previousFellowIndex] as FellowCardProps),
              showVideo: false,
            }
          }
          return newCardList
        })

        timeoutId = setTimeout(() => randomizeVideo(randomFellowIndex), 3500)
      }
    }

    randomizeVideo()
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {cardList.map((card) => {
        return (
          <Link key={card.id} href={`/card/${card.id}`} passHref>
            <Card key={card.id} item={card} />
          </Link>
        )
      })}
    </div>
  )
}
