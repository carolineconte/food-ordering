import Link from "next/link";

export default function BtnNavigate({ children, href }) {
  return (
    <Link className='border-2 font-semibold bg-slate-100 rounded-lg py-2 px-4 md:w-1/2 mx-auto shadow-sm flex gap-6 items-center justify-center my-8
      hover:shadow-sm hover:bg-slate-200/80'
      href={href}>
      {children}
    </Link>
  )
}