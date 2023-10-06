import { CardVideo } from './CardVideo'
import Image from 'next/image'
import React, { useState, useEffect, useRef, CSSProperties } from 'react';

export const CardImage = ({
  image
}: {
  image: string | null
  title?: string
  colorCode: string
}) => {


  
  const imageBg: CSSProperties = {
    backgroundImage: `url('https://${image}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  return (

    <div className='h-full w-full rounded-lg'>
      <div className="absolute h-full w-full rounded-lg" style={imageBg}>
          <Image src={image ?'https://'+image : '/logo.svg'} layout='fill' />
      </div>
    </div>
  )
}
