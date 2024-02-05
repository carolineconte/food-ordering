import Image from "next/image"
import { MenuItem } from "../menu/MenuItem"
import { SectionHeaders } from "./SectionHeaders"

export const HomeMenu = () => {
  return (
    <section className="mt-20">
  
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
