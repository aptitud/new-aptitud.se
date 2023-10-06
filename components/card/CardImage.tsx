import { CardVideo } from './CardVideo'
import Image from 'next/image'
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

  const [showVideo, setShowVideo] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
  

    timeoutRef.current = setTimeout(() => {
      setShowVideo(true);
      timeoutRef.current = setTimeout(() => { 
          setShowVideo(false) 
        }, 
        3500);
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  const imageBg: CSSProperties = {
    backgroundImage: `url('${image ? image : '/logo.svg'}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  const videoBg: CSSProperties = {
    display: showVideo ? 'block' : 'none',
  }
  
  return (

    <div className='h-full w-full '>
      <div className="absolute rounded-lg h-full w-full overflow-hidden" style={imageBg}>
      </div>
      <div className='absolute rounded-lg h-full w-full' style={videoBg} >
        <CardVideo url={video || ''}  />
      </div>
    </div>
  )
}
