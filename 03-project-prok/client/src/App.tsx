import axios from 'axios'
import { BASE_URL } from './components'
import './App.css'
import type { Tour } from './types/tour'
import { useEffect, useRef, useState } from 'react'

function App() {
  const [tours, setTours] = useState<Tour[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const [axtaris, setAxtaris] = useState('')
  const [sirala, setSirala] = useState('')
  const [istiqamet, setIstiqamet] = useState('asc')

  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 🔥 Backend-ə uyğun sorğu göndərən funksiya
  const fetchTours = async (
    searchValue = axtaris,
    sortValue = sirala,
    orderValue = istiqamet
  ) => {
    try {
      setLoading(true)

      let url = `${BASE_URL}/api/tours?`

      if (searchValue) url += `search=${searchValue}&`
      if (sortValue) url += `sort=${sortValue}&order=${orderValue}`

      const response = await axios(url)
      setTours(response.data.data)
      setError('')
    } catch (err: unknown) {
      const mesaj =
        err instanceof Error ? err.message : 'Naməlum xəta baş verdi'
      setError(mesaj)
    } finally {
      setLoading(false)
    }
  }

  // 🔎 Axtarış (Debounce ilə)
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAxtaris(value)

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      // minimum 2 hərf və ya boş olanda
      if (value.length > 1 || value.length === 0) {
        fetchTours(value, sirala, istiqamet)
      }
    }, 500)
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) return <p>Yüklənir...</p>

  if (error)
    return (
      <p>
        Xəta: {error}
        <button onClick={() => fetchTours()}>Yenidən yoxla</button>
      </p>
    )

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Tur Siyahısı</h1>

      {/* 🔎 AXTARIŞ */}
      <div style={{ marginBottom: '15px' }}>
        <input
          type="search"
          placeholder="Tur axtar (minimum 2 hərf)..."
          value={axtaris}
          onChange={handleSearch}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>

      {/* 🔃 SIRALAMA */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <select
          value={sirala}
          onChange={(e) => {
            setSirala(e.target.value)
            fetchTours(axtaris, e.target.value, istiqamet)
          }}
        >
          <option value="">Sırala</option>
          <option value="price">Qiymətə görə</option>
          <option value="title">Ada görə</option>
          <option value="duration">Müddətə görə</option>
        </select>

        <select
          value={istiqamet}
          onChange={(e) => {
            setIstiqamet(e.target.value)
            fetchTours(axtaris, sirala, e.target.value)
          }}
        >
          <option value="asc">Artan</option>
          <option value="desc">Azalan</option>
        </select>
      </div>

      {tours.length === 0 && (
        <p style={{ color: 'red' }}>Tur tapılmadı</p>
      )}

      <ul>
        {tours.map((tour) => (
          <li key={tour.id} style={{ marginBottom: '15px' }}>
            <strong>{tour.title}</strong>
            <br />
            Məkan: {tour.destination}
            <br />
            Qiymət: {tour.price} ₼
            <br />
            Müddət: {tour.duration} gün
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App