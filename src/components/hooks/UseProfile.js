import { useEffect, useState } from 'react';

export default function UseProfile(){

  const [data, setData] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile').then(res => {
      res.json().then(data => {
        setData(data.admin)
        setLoading(false)
      })
    })
  }, [])

  return {Loading, data}
}