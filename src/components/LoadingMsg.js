export default function LoadingMsg() {
  return (
    <div className="flex flex-col gap-5 items-center text-center h-screen justify-center grow ">      <div className='h-10 w-10 animate-spin rounded-full border-b-4 border-secondary'></div>
      <p>Caricamento in corso... <br />
        per favore, attendi.</p>
    </div>

  )
}