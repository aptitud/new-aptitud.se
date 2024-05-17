import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  if (!process.env.TRELLO_API_KEY || !process.env.TRELLO_API_TOKEN) {
    return new Response('Trello api key or api token was not found')
  }
  const trelloData = await getTrelloData()
  return NextResponse.json(trelloData)
}

const BOARD_BLOCK_LIST = ['4facbfa881997b1a500469e4']

async function getTrelloData() {
  const boards = await getTrelloBoards()
  const cards: TrelloBoardCard[] = []
  for (const board of boards.filter((x) => x.closed === false && !BOARD_BLOCK_LIST.includes(x.id))) {
    const boardCards = await getTrelloBoardCards(board.id)
    cards.push(
      ...boardCards.map(
        (card) =>
          ({
            id: card.id,
            name: card.name,
            desc: card.desc,
            boardId: board.id,
            boardName: board.name,
          } as TrelloBoardCard)
      )
    )
  }
  return cards
}

type TrelloBoard = {
  id: string
  name: string
  url: string
  closed: boolean
}
async function getTrelloBoards(): Promise<TrelloBoard[]> {
  const response = await fetch(
    `https://api.trello.com/1/members/me/boards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`
  )
  if (!response.ok) {
    throw new Error('Failed to get trello data')
  }

  return response.json()
}

type TrelloBoardCard = {
  id: string
  name: string
  desc: string
} & {
  boardId: string
  boardName: string
}
async function getTrelloBoardCards(boardId: string): Promise<TrelloBoardCard[]> {
  const response = await fetch(
    `https://api.trello.com/1/boards/${boardId}/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_API_TOKEN}`
  )
  if (!response.ok) {
    throw new Error('Failed to get trello data')
  }

  return response.json()
}
