
export const CardImage = ({
  image
}: {
  image: string | null
  title?: string
  colorCode: string
}) => {



  return (

    <div className='h-full w-full rounded-lg' >
      <div className="absolute h-full w-full " >
          <img src={image ?'https://'+image : '/logo.svg'} className='object-fill rounded-lg' />
      </div>
    </div>
  )
}
