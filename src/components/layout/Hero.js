import Image from "next/image"
import Right from "../icons/Right"

export default function Hero() {
  return (
    <section className="hero sm:mt-6 items-center">
      
      <div className="py-24 text-center text-white">
        <h1 className="text-4xl grow w-full  py-2 !leading-15
        sm:py-4 sm:text-8xl sm:px-2">
          Che cosa c&apos;è <br/>
          di meglio di una
          <span className="text-secondary sm:block"> Pizza?</span>
        </h1>

        <p className="selection:my-4 text-base
        sm:text-lg ">
          Siamo orgogliosi di portare l&apos;autentica esperienza della cucina piemontese nella vostra tavola. 
          Con la nostra passione per la tradizione e gli ingredienti 
          freschi locali, ogni morso è un viaggio attraverso i sapori unici della nostra regione.
        </p>
      </div>

    </section>
  )
}