'use client'

import React, { useEffect, useState } from 'react'
import { FellowCardProps } from '../../lib/domain/types'
import { useInView } from 'react-intersection-observer'

export const FellowCard = React.forwardRef<HTMLDivElement, FellowCardProps>(function FellowCard(item, forwardRef) {
  const [isShowingVideo, setIsShowingVideo] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  // @TODO need to fix this again? (removed when fixing forwardRef) not sure if it worked bofore?
  // const [ref, inView] = useInView({
  //   triggerOnce: false, // Fire the event only once
  //   root: null, // Use the viewport as the root
  //   rootMargin: '0px',
  //   threshold: 0.7, // Trigger when at least 50% of the element is in the viewport
  // })

  let videoTimeout: NodeJS.Timeout

  const displayVideo = () => {
    setIsShowingVideo(true)
    setIsRendered(true)
    videoTimeout = setTimeout(() => {
      let videoElement = document.getElementById(`fellow-card-vid-${item.title}`) as HTMLVideoElement
      if (!videoElement) {
        console.log(`video element not found for ${item.title}`)
        return
      }
      const mode = new URLSearchParams(document.location.search).get('mode')
      videoElement.loop = mode === 'active'
      videoElement.play()
    }, 250)
  }

  const hideVideo = () => {
    setIsShowingVideo(false)
    clearTimeout(videoTimeout)
    let videoElement = document.getElementById(`fellow-card-vid-${item.title}`) as HTMLVideoElement
    videoElement?.load()
  }

  useEffect(() => {
    // @TODO relates to above
    // if (!inView) {
    //   setIsShowingVideo(false)
    //   return
    // }

    if (item.showVideo) {
      displayVideo()
    } else {
      hideVideo()
    }
  }, [item.showVideo])
  // }, [inView, showVideo])

  return (
    <div
      role={'button'}
      className={`relative h-full`}
      title={item.title}
      id={item.image || ''}
      ref={forwardRef}
      onMouseEnter={() => displayVideo()}
      onMouseLeave={() => hideVideo()}
      // {...props}
    >
      {
        /*
            lazy load av videor för att inte behöva vänta på att alla ska laddas ner innan sidan kan visas
            sätt display till block när videon är i viewporten men none när den är utanför så inte de tar upp onödiga 
            resurser i browsern när de ändå inte syns. 
            Använder isRendered för att inte plocka bort komponenten och trigga en ny nerladdning när den visas nästa gång.
          */
        isShowingVideo || isRendered ? (
          <div
            className="absolute h-full w-full"
            style={{
              display: isShowingVideo ? 'block' : 'none',
            }}
          >
            <video
              disableRemotePlayback
              id={`fellow-card-vid-${item.title}`}
              src={item.video || ''}
              muted
              className="fellow-video rounded-lg"
              poster={item.image || ''}
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <div
              className=" absolute z-10 h-full w-full rounded-lg"
              style={{
                background: `linear-gradient(to bottom, #fff0 40%, var(--${item.colorCode}) 75%)`,
              }}
            ></div>
          </div>
        ) : (
          <></>
        )
      }
      <div className="h-3/5"></div>
      <div className={`h-2/5 text-white px-3 pb-4 md:px-4 md:pb-6`}>
        <div className="grid grid-cols-1 relative h-full z-20">
          <h3 className="text-base md:text-2xl mb-1 md:mb-1 font-medium truncate">{item.title}</h3>
          <span className="text-xs md:text-lg line-clamp-3  md:line-clamp-3">{item.text}</span>
        </div>
      </div>
    </div>
  )
})
