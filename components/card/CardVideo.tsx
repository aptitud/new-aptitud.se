export const CardVideo = ({
  url,
}: {
  url: string
}) => {
  return  (
  <video autoPlay src= { url } muted loop>
    Your browser does not support the video tag.
  </video>
  )
}
