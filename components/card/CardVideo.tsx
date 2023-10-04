import {CSSProperties} from "react";

export const CardVideo = ({
  url,
}: {
  url: string
}) => {
  return  (
        <video autoPlay src= { url } muted loop className="fellow-video">
          Your browser does not support the video tag.
        </video>
  )
}
