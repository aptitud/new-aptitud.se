import {CSSProperties} from "react";

export const CardVideo = ({
  url,
}: {
  url: string
}) => {
  return  (
        <video src= { url } muted className="fellow-video rounded-lg">
          Your browser does not support the video tag.
        </video>
  )
}
