import React, { CSSProperties, useEffect, useState } from 'react'
import { FellowCardProps } from './types'

export const FellowCard = ({
  image,
  title,
  text,
  colorCode,
  socialLinks,
  onKeyDown,
  video,
  ...props
}: FellowCardProps) => {
  const [videoDisplay, setVideoDisplay]  = useState('none') 


  const imageWithGradient: CSSProperties = image
    ? {
      backgroundImage: `linear-gradient(to bottom, #fff0 50%, var(--aptitud-petrol) 90%), url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }
    : {
      backgroundColor: `var(--${colorCode})`,
    }

    useEffect(() =>  {
      const queryParams = new URLSearchParams(document.location.search).get('mode');
      setVideoDisplay( queryParams === 'active' ? 'block' : 'none')
    })

  return (
    <div
      role={'button'}
      className={`rounded-lg h-60 md:h-96 m-0 p-0 cursor-pointer`}
      style={imageWithGradient}
      tabIndex={0}
      onKeyDown={onKeyDown}
      title={title}
      {...props}
    >

      <div className='relative h-full w-full' >
        <div className="absolute h-full w-full" style={
          {
            display: `${videoDisplay}`
          }
        }>
          <video src={video || ''} muted autoPlay className='fellow-video rounded-lg' poster={image || ''} playsInline loop >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="h-3/5">

        </div>
        <div className={`h-2/5 text-white px-3 pb-3 pt-10 md:px-4 md:pb-6 md:pt-8`}>
          <div className="grid grid-cols-1 relative h-full">
            <h3 className="text-base md:text-2xl mb-1 md:mb-1 font-medium truncate">{title}</h3>
            <span className='text-xs md:text-lg line-clamp-3  md:line-clamp-3'>
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}