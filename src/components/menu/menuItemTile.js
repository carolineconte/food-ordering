import Image from 'next/image'

export default function menuItemTile({ item }) {
  const { name, description, image } = item;

  return (
    <>
      <Image src={image} alt="menu-item" width={250} height={100} quality={95} priority={true}
        className='h-44 block mx-auto'
        />
      <h4 className="font-semibold text-xl">{name}</h4>
      <p className="text-gray-500 text-sm grow">
        {description}
      </p>

    </>
  )
}