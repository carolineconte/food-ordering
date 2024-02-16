'use client'

import { SectionHeaders } from "@/components/layout/SectionHeaders";
import { MenuItem } from "@/components/menu/MenuItem";
import { useEffect, useState } from "react"

export default function MenuPage() {

  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then(res => {
      res.json().then(cat => {
        setCategories(cat)
      })
    })

    fetch('/api/menu-items').then(res => {
      res.json().then(items => {
        setMenuItems(items)
      })
    })
  }, [])

  return (
    <section className="my-12 grow ">
      {categories.length > 0 && categories.map(categorie => (
        <section key={categorie._id}>
          <SectionHeaders mainHeader={categorie.name} />
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:px-0 gap-4">
            {
              menuItems.filter(item => item.categorie === categorie._id).length === 0 ?
                (
                  <p>Nenhum item nesta categoria</p>
                ) : (
                  menuItems.filter(item => item.categorie === categorie._id).map(item => (
                    <MenuItem key={item._id} item={item} />
                  ))
                )
            }
          </div>
        </section>
      ))}
    </section>
  )
}