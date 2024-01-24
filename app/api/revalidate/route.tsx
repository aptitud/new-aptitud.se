import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { REVALIDATE_TAGS } from '../../../lib/consants'

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-revalidate-key')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  Object.values(REVALIDATE_TAGS).forEach((tag) => {
    revalidateTag(tag)
  })

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
