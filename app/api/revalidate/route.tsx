import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const tags = {
  fellows: 'fellows',
  posts: 'posts',
  contacts: 'contacts',
  instagram: 'instagram',
}

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = requestHeaders.get('x-vercel-revalidate-key')

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  Object.values(tags).forEach((tag) => {
    revalidateTag(tag)
  })

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
