import React, { CSSProperties, useEffect, useState } from 'react'
import { FellowCardProps } from './types'
import { useInView } from 'react-intersection-observer'

export const FellowCard = ({
  image,
  title,
  text,
  colorCode,
  socialLinks,
  onKeyDown,
  video,
  showVideo,
  ...props
}: FellowCardProps) => {
  const [isShowingVideo, setIsShowingVideo] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: false, // Fire the event only once
    root: null, // Use the viewport as the root
    rootMargin: '0px',
    threshold: 0.7, // Trigger when at least 50% of the element is in the viewport
  })

  const displayVideo = () => {
    setIsShowingVideo(true)
    setIsRendered(true)
    setTimeout(() => {
      let videoElement = document.getElementById(
        `fellow-card-vid-${title}`
      ) as HTMLVideoElement
      if (!videoElement) {
        console.log(`video element not found for ${title}`)
        return
      }
      const mode = new URLSearchParams(document.location.search).get('mode')
      videoElement.loop = mode === 'active'
      videoElement.play()
    }, 250)
  }

  const hideVideo = () => {
    setIsShowingVideo(false)
  }

  const imageWithGradient: CSSProperties = image
    ? {
        backgroundImage: `linear-gradient(to bottom, #fff0 40%, var(--aptitud-petrol) 75%), url('${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {
        backgroundColor: `var(--${colorCode})`,
      }

  useEffect(() => {
    if (!inView) {
      setIsShowingVideo(false)
      return
    }

    if (showVideo) {
      displayVideo()
    } else {
      hideVideo()
    }
  }, [inView, showVideo])

  return (
    <div
      role={'button'}
      className={`rounded-lg h-60 md:h-96 m-0 p-0 cursor-pointer shadow-md`}
      style={imageWithGradient}
      tabIndex={0}
      onKeyDown={onKeyDown}
      title={title}
      id={image || ''}
      {...props}
      ref={ref}
    >
      <div
        className="relative h-full w-full"
        style={{
          backgroundColor: `var(--aptitud-transparent)`,
        }}
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
                id={`fellow-card-vid-${title}`}
                src={video || ''}
                muted
                className="fellow-video rounded-lg"
                poster={image || ''}
                playsInline
              >
                Your browser does not support the video tag.
              </video>
              <div
                className="absolute z-10 h-full w-full"
                style={{
                  background:
                    'linear-gradient(to bottom, #fff0 40%, var(--aptitud-petrol) 75%)',
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
            <h3 className="text-base md:text-2xl mb-1 md:mb-1 font-medium truncate">
              {title}
            </h3>
            <span className="text-xs md:text-lg line-clamp-3  md:line-clamp-3">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
