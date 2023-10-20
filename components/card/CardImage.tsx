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
          <Image
            src={`https:${image}`}
            alt={title || ''}
            className='object-fill rounded-sm'
            fill
            sizes="100vw" />
          : <Image
            src='/logo.svg'
            alt={title || ''}
            className='object-fill rounded-sm'
            fill
            sizes="100vw" />
        }
      </div>
    </div>
  );
}
