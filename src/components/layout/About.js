import React from 'react'
import { SectionHeaders } from './SectionHeaders'

export const About = () => {
  return (
    <section id='about' className='text-center flex flex-col gap-3 text-gray-500 max-w-5xl mx-auto mt-10'>
      <SectionHeaders
        mainHeader={'Chi Siamo'}
        subHeader={'Usiamo il superpotere della pizza per diffondere felicità'}
      />
      <p className='mt-4'>
        Siamo una famiglia appassionata che porta avanti la tradizione culinaria della nostra amata regione.
         Situata nel cuore delle Alpi, la nostra pizzeria si impegna a offrire autentiche esperienze culinarie 
         attraverso le nostre deliziose pizze artigianali.
      </p>
      <p>
        La nostra storia inizia con la passione per gli ingredienti freschi e di alta qualità.
        Ogni pizza è preparata con cura e dedizione, utilizzando ricette tramandate di generazione in generazione.
        Dalle classiche Margherita ai gusti
        più audaci, offriamo una vasta selezione di pizze per soddisfare ogni palato.
      </p>
      <p>
      Ma non si tratta solo di pizza. Presso la nostra pizzeria, ci impegniamo a creare un&apos;atmosfera accogliente
       e familiare, dove ogni cliente si sente parte della nostra famiglia. Siamo grati per l&apos;opportunità 
       di condividere la nostra passione con voi e vi invitiamo a venire a trovarci e a vivere un&apos;esperienza gastronomica indimenticabile.
      </p>
      <p>
      Grazie per essere parte della nostra storia. Buon appetito!
      </p>
    </section>
  )
}


