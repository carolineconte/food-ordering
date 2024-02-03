'use client';
//1691Metron
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export default function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null)
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false)

  const validate = (data) => {
    const errors = {};
    if (!data.email) {
      errors['email'] = 'Email is required!'
    }
    if (!data.password) {
      errors['password'] = 'Password is required!'
    }
    if (data.password.length < 5) {
      errors['password'] = 'Password must be at least 5 characters'
    }
    return errors;
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    const user = {
      email, password
    }

    const validateErrors = validate(user);
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
      return;
    }

    setCreatingUser(true)

    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })

    setCreatingUser(false)
    setUserCreated(true)
    setErrors(null)
  }

  return (
    <section className="flex-grow flex items-center">

      <form className="flex flex-col gap-2 m-auto w-3/5 max-w-md px-10 py-14 rounded-3xl  bg-secondary shadow-lg"
        onSubmit={handleFormSubmit}>
        <h1 className="text-white/90 mb-6 uppercase text-center text-3xl">Creare account</h1>
        {userCreated && (
          <div className="text-white my-4 text-center text-lg">
            User created. <br />
            Now you can {''}
            <Link href={'/login'} className="underline text-xl font-bold">
              Login &raquo;
            </Link>
          </div>
        )}
        <input className="input" type="email" name="" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          disabled={creatingUser}
        />
        {errors?.email && <small className="text-xs text-red-500 mt-1 pl-2">{errors?.email}</small>}

        <input className="input mt-4" type="password" name="" id="" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          disabled={creatingUser}
        />
        {errors?.password && <small className="text-xs text-red-500 mt-1 pl-2">{errors?.password}</small>}

        <button className="btn block bg-primary hover:bg-primaryHover transition"
          disabled={creatingUser}
        >
          Continua</button>

        <div className="my-4 text-center text-gray-50">o accedi con provider</div>
        <button className="btn flex gap-4 hover:bg-white/30 transition">
          <Image src='/googleLogo.png' alt="Logo Google" width={24} height={24} />
          Accedi con Google
        </button>
      </form>
    </section>
  )
}
