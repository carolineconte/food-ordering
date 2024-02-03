'use client';

import Image from "next/image";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleFormSubmit(e) {
    e.preventDefault();

    fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers:{'Content-Type': 'application/json'}
    })

  }

  return (
    <section className="flex-grow flex items-center">

      <form className="flex flex-col gap-2 m-auto w-3/5 max-w-md px-10 py-14 rounded-3xl  bg-secondary shadow-lg"
        onSubmit={handleFormSubmit}>
        <h1 className="text-white/90 mb-6 uppercase text-center text-2xl">Creare account</h1>

        <input className="input" type="email" name="" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
        />

        <input className="input mt-4" type="password" name="" id="" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
        />

        <button className="btn block bg-primary hover:bg-primaryHover transition">Continua</button>

        <div className="my-4 text-center text-gray-50">o accedi con provider</div>
        <button className="btn flex gap-4 hover:bg-white/30 transition">
          <Image src='/googleLogo.png' alt="Logo Google" width={24} height={24} />
          Accedi con Google
        </button>
      </form>
    </section>
  )
}
