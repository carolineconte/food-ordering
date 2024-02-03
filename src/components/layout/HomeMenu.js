import Image from "next/image"
import { MenuItem } from "../menu/MenuItem"
import { SectionHeaders } from "./SectionHeaders"

export const HomeMenu = () => {
  return (
    <section className="mt-20">
      <div className="relative">
        <div className="h-48 w-48 absolute -top-20 -left-6 -z-10
        lg:-left-28 lg:-top-96
        md:-left-4 md:-top-16">
          <Image src='/basil.png' width={60} height={50} alt="basil" />
        </div>
        <div className="h-48 w-48 absolute -right-40 -z-10 
        lg:-right-28 lg:-top-10
        md:-right-28 md:-top-16">
          <Image src='/basil.png' width={60} height={50} alt="basil" />
        </div>
      </div>

      <SectionHeaders mainHeader={'Menu'} subHeader={'I gusti più amati'}/>

      <div className="py-4 grid grid-cols-2
      sm:grid-cols-3 lg:grid-cols-4 sm:px-0 gap-4">
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
        <MenuItem/>
      </div>
    </section>
  )
}
