import Image from 'next/image'
import { CardVideo } from './CardVideo'
import React, { useState, useEffect, useRef } from 'react';

export const CardImage = ({
  image,
  colorCode,
  title,
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
    }, 3000);

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);

  return (
    /**
     * TODO: Få video och stillbild att bli exakt lika stora, responsiva och 
     * på samma plats så att det inte blir något "hopp" när videon byts till stillbild.
     */

    <div className='h-full w-full'>
      {
        video && showVideo ? 
        <CardVideo url={video} />
        : image? 
          <Image src={`https:${image}`} layout="fill" objectFit="cover" alt="asdf" className={"rounded-lg"} />
          : <Image src="/logo.svg" alt="asdf" layout="fill" className={"rounded-lg"} />
      }
    </div>
  )
}
