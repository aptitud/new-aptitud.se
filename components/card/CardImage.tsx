import Image from "next/image"
export const CardImage = ({
  image, 
  title
}: {
  image: string | null
  title?: string
}) => {

  return (
    <div className='h-full w-full rounded-lg' >
      <div className="absolute h-full w-full " >
        {
          image ?  
          <Image src={`https:${image}`} layout='fill' alt={title} className='object-fill rounded-sm' />
          : <Image src='/logo.svg' layout='fill' alt={title} className='object-fill rounded-sm' />
        }
      </div>
    </div>
  )
}
