import { useState } from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { WeatherCard } from './Components/WeatherCard/WeatherCard';

function App() {

  const [city, setCity] = useState()
  const [geoData, setGeoData] = useState()
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [responseText, setResponseText] = useState('')
  const apiKey = import.meta.env.VITE_API_KEY;
  const date = new Date().toDateString()

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

    // <div class="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
    <>
      <div className='flex flex-col items-center min-h-screen align-middle justify-center font-mono'>
        <h1 className='text-gray-50 text-center text-xl sm:text-2xl m-4 font-semibold'>Consulta el clima en tu ciudad deseada</h1>
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
        {loading ? <svg xmlns="http://www.w3.org/2000/svg" className='size-10 m-4' viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle20" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle27.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle21" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle24.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle22" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle25.end" dur="0.2s" values="13;1" /><animate id="svgSpinnersBlocksShuffle23" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle26.end" dur="0.2s" values="13;1" /></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle24" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle20.end" dur="0.2s" values="13;1" /><animate id="svgSpinnersBlocksShuffle25" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle21.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle26" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle22.end" dur="0.2s" values="1;13" /><animate id="svgSpinnersBlocksShuffle27" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle23.end" dur="0.2s" values="13;1" /></rect></svg> : null}
      </div >
    </>
  )
}

export default App