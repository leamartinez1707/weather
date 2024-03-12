import { useEffect, useState } from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { WeatherCard } from './Components/WeatherCard/WeatherCard';
import Loader from './Components/Loader/Loader'

function App() {

  const [city, setCity] = useState()
  const [geoData, setGeoData] = useState()
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [responseText, setResponseText] = useState('')
  const apiKey = import.meta.env.VITE_API_KEY;
  const date = new Date().toDateString()

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  async function success(pos) {
    setLoading(true)
    const crd = pos.coords;
    setTimeout(async () => {

      const myLocation = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&lang=es&appid=${apiKey}`)
      if (!myLocation.ok) {
        setLoading(false)
        return;
      }
      const data = await myLocation.json()
      setGeoData(data)
      console.log(data)
      setCountry(data.sys.country)
      setLoading(false)
    }, 2000);
  }

  function error(err) {
    alert(`ERROR(${err.code}): ${err.message}`);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);

  }, [])


  const searchCity = () => {
    try {
      if (!city) return;
      setGeoData()
      setLoading(true)
      setTimeout(async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&units=metric&lang=es&appid=${apiKey}`)
        if (!response.ok) {
          setResponseText(response.statusText)
          setLoading(false)
          return;
        }
        const data = await response.json()
        setResponseText(response.statusText)
        setGeoData(data)
        setCountry(data.sys.country)
        setLoading(false)
      }, 2000);
    } catch (err) {
      throw new Error('Try catch Error')
    }
  }
  return (
    <>
      <div className='flex flex-col items-center min-h-screen align-middle justify-center font-mono'>
        <h1 className='text-gray-50 text-center text-xl sm:text-2xl m-4 font-semibold'>Consulta el clima de tu ciudad deseada</h1>
        <div className='flex p-2 border border-gray-300 rounded-xl bg-white'>
          <input
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                searchCity();
              }
            }} autoFocus onChange={(e) => setCity(e.target.value)} maxLength={20} placeholder='Ej: Montevideo' className='p-2 outline-none text-xl' id='textCity' type="text" />
          <button className='bg-white font-semibold bg-[url(https://svgsilh.com/svg_v2/297822.svg)]' onClick={searchCity} ><img className='size-8 justify-center align-middle' src="https://svgsilh.com/svg_v2/297822.svg" alt="" /></button>
        </div>
        {geoData && <WeatherCard geoData={geoData} country={country} date={date} />
        }
        {responseText === 'Not Found' && !loading && <h1 className='text-red-600 font-bold my-4 text-lg'>Ciudad no encontrada</h1>}
        {loading ? <Loader /> : null}
      </div >
    </>
  )
}

export default App