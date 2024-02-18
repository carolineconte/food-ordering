'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function UserTabs() {

  const path = usePathname();

  return (
    <div className='flex flex-wrap gap-2 justify-center tabs mb-6'>
      <Link className={path === '/profile' ? 'active' : ''}
        href={'/profile'}>Profilo
      </Link>
      <Link className={path === '/categories' ? 'active' : ''}
        href={'/categories'}>Categorie
      </Link>
      <Link className={path.includes('menu-items') ? 'active' : ''}
        href={'/menu-items'}>Piatti del Menu
      </Link>
      <Link className={path.includes('/users') ? 'active' : ''}
        href={'/users'}>Utenti
      </Link>
      <Link className={path.includes('/orders') ? 'active' : ''}
        href={'/orders'}>Ordini
      </Link>
    </div>
  )
}