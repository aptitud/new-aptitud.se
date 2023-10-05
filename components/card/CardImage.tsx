import Image from 'next/image'
import { CardVideo } from './CardVideo'
import React, { useState, useEffect, useRef, CSSProperties } from 'react';

export const CardImage = ({
  image,
  video
}: {
  image: string | null
  video: string | null
  title?: string
  colorCode: string
}) => {

  const [showVideo, setShowVideo] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('triggered')
    timeoutRef.current = setTimeout(() => {
      setShowVideo(false);
    }, 3150);

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  const imageBg: CSSProperties = {
    backgroundImage: `url('${image ? image : '/logo.svg'}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  return (

    <div className='h-full w-full rounded-lg'
      style={imageBg}
    >
      {
        video && showVideo ?
          <CardVideo url={video} />
          : <></>
      }
    </div>
  )
}
