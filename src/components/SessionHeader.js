export default function SessionHeader({children}) {
  return (
    <section>
      <h1 className="mb-6 uppercase text-center text-3xl">
        {children}
      </h1>
    </section>
  )
}