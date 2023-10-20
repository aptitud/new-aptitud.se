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
      let videoElement = (document.getElementById(`detailvid-${video}`) as HTMLVideoElement)
      console.log(videoElement);
      videoElement.play()
    }, 1000);

    return () => {
      clearTimeout(timeoutRef.current!);
    };
  }, []);


  return (
    <div className='absolute h-full w-full' >
      <video id= { `detailvid-${video}`} src={video || ''} muted className='fellow-video rounded-lg' poster={image || '' } playsInline>
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
