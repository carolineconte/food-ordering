'use client'
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true);
    //fazer as credenciais assim por seguranca
    try {
      await signIn('credentials', { email, password, callbackUrl: '/' });
    } catch (error) {
      console.log(error)
    }
    //calback redireciona para homepage
    setLoading(false)
  }

  return (
    <section className="flex-grow flex items-center">

      <form className="flex flex-col gap-2 m-auto w-3/5 max-w-md px-10 py-14 rounded-3xl bg-secondary shadow-lg"
        onSubmit={handleFormSubmit}>
        <h1 className="text-white/90 mb-6 uppercase text-center text-3xl">
          Accedi</h1>

        {error && (<small className="text-xs text-red-500 mt-1 pl-2">{error}</small>)}

        <input className="input" type="email" name="email" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />

        <input className="input mt-4" type="password" name="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />

        <button className="btn block mt-4 bg-primary hover:bg-primaryHover transition"
          disabled={loading}
        >
          Continua
        </button>


        <div className="mt-8 text-center text-gray-50">o accedi con provider</div>
        <button type="button" onClick={() => signIn('google', { callbackUrl: '/' })}
          className="btn flex gap-4 hover:bg-white/30 transition" >
          <Image src='/googleLogo.png' alt="Logo Google" width={24} height={24} />
          Accedi con Google
        </button>

        <p className="text-gray-50 mt-8 text-center ">
          Sei nuovo su Fiorela? <br />
          <Link className="underline text-lg font-bold" href='/login'>Crea il tuo account &raquo;</Link>
        </p>
      </form>
    </section>
  )
}