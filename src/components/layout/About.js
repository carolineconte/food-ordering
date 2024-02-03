import React from 'react'
import { SectionHeaders } from './SectionHeaders'

export const About = () => {
  return (
    <section className='text-center flex flex-col gap-2 text-gray-500'>
      <SectionHeaders
      mainHeader={'Chi Siamo'}
      subHeader={'Usiamo il superpotere della pizza per diffondere felicità'}
      />
      <p className='mt-4'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus ad totam amet ab rerum magni architecto odio
        voluptate nam ex!
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus ad totam amet ab rerum magni architecto odio
        voluptate nam ex!
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Non vitae illum tempora nobis, totam aut necessitatibus porro quam
        recusandae illo, tenetur sed reprehenderit voluptatum neque labore
        id. Eos, repellendus officiis!
      </p>
    </section>
  )
}
