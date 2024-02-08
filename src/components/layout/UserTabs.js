'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function UserTabs() {
  const path = usePathname();

  return (
    <div className='flex gap-2 justify-center tabs mb-6'>
      <Link className={path === '/profile' ? 'active' : ''}
        href={'/profile'}>Profilo
      </Link>
      <Link className={path === '/categories' ? 'active' : ''}
        href={'/categories'}>Categorie
      </Link>
      <Link className={path.includes('menu-items') ? 'active' : ''}
        href={'/menu-items'}>Menu
      </Link>
      <Link className={path === '/Users' ? 'active' : ''}
        href={'/Users'}>Users
      </Link>
    </div>
  )
}