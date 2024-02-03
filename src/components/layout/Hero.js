import Image from "next/image"
import Right from "../icons/Right"

export default function Hero() {
  return (
    <section className="sm:grid grid-cols-2 sm:mt-6">
      <div className="mt-4 text-center flex flex-col items-center gap-4">
        <h1 className="text-4xl bg-primary w-full text-white py-2 !leading-15
        sm:py-4 sm:text-6xl sm:text-left sm:px-2 sm:bg-white sm:text-black">
          Everything is better <br />
          with a
          <span className="text-secondary sm:block"> Pizza!</span>
        </h1>

        <div className="sm:hidden">
          <Image src={'/pizza.png'} alt={"pizza"} width={500} height={100} objectFit="contain" />
        </div>

        <p className="selection:my-4 text-gray-500 text-base
        sm:text-lg sm:text-left">
          Pizza is the missing piece that makes every day complete,
          a simple yet delicious joy in life.
        </p>
        <div className="flex gap-6 items-center text-sm">
          <button className="flex gap-2 uppercase items-center bg-primary text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          {/* <button className="flex gap-2 py-2 text-gray-500 font-semibold">
            Learn more
            <Right />
          </button> */}
        </div>
      </div>
      <div className="hidden relative sm:flex items-center ">
        <Image src={'/pizza.png'} alt={"pizza"} layout="fill" objectFit="contain" />
      </div>

    </section>
  )
}