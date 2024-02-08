import toast from 'react-hot-toast';
import Image from 'next/image';

export default function EditableImage({ link, setLink }) {

  async function handleImgChange(e) {
    e.preventDefault();
    const files = e.target.files;

    if (files?.length === 1) {
      const data = new FormData
      data.set('file', files[0])

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(res => {

        if (res.ok) {
          return res.json().then(link => {
            setLink(link)
          })
        }
        throw new Error('Si é verificato un problema. Riprova più tardi.')
      })

      await toast.promise(uploadPromise, {
        loading: 'Stiamo caricando la tua immagine, attendi un momento...',
        success: `Caricamento dell'immagine completato: tutto è andato bene!`,
        error: `Oops! C'è stato un problema, riprova più tardi.`
      })
    }
  }

  return (
    <div className='w-52 flex flex-col text-center md:mt-4'>
      <div className=' bg-gray-100 border p-2 rounded-lg '>
        <Image src={link ? link : '/addImg.svg'} width={250} height={250} alt='profile image'></Image>
      </div>

      <label>
        <input type="file" className='hidden' onChange={handleImgChange} />
        <span className='border-2 cursor-pointer block mt-2 px-4 py-2 rounded-full
              hover:bg-slate-100 hover:shadow'>
          Modifica
        </span>
      </label>
    </div>
  )
}