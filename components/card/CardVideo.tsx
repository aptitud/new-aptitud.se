import React, { useEffect, useRef } from 'react';

export const CardVideo = ({
  image,
  video
}: {
  image: string | null
  video: string | null
  title?: string
  colorCode: string
}) => {

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      (document.getElementsByClassName('fellow-video')[0] as HTMLVideoElement).play()
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);


  return (
    <div className='absolute h-full w-full' >
      <video src={video || ''} muted className='fellow-video rounded-lg' poster={image || '' }>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
