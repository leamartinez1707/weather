import { useState, useEffect } from 'react'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import './App.css'

function App() {

  const [city, setCity] = useState()
  const [geoData, setGeoData] = useState()
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const apiKey = import.meta.env.VITE_API_KEY;
  const date = new Date().toDateString()
  const searchCity = () => {
    try {
      setLoading(true)
      setTimeout(async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=5&units=metric&lang=es&appid=${apiKey}`)
        if (!response.ok) throw new Error('Fetch network error');
        const data = await response.json()
        console.log(data)
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
      <div className='flex flex-col'>
        <div className='p-6'>
          <label className='font-bold' htmlFor="textCity">Ingrese la ciudad </label>
          <input autoFocus onChange={(e) => setCity(e.target.value)} maxLength={30} className='border border-black p-2 m-4' id='textCity' type="text" />
          <button onClick={searchCity}>Ver clima</button>
        </div>
        {geoData &&
          <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
              <div className="font-bold text-xl">{geoData.name} <span className={`fi fi-${country.toLowerCase()}`}></span></div>
              <div className="text-sm text-gray-500">{date.toLocaleUpperCase()}</div>
              <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                <img className='size-20 bg-gray-300 rounded-full' src={`https://openweathermap.org/img/wn/${geoData.weather[0].icon}.png`} alt="Weather Icon" />
              </div>
              <div className="flex flex-row items-center justify-center mt-6">
                <div className="font-medium text-6xl">{geoData.main.temp}</div>
                <div className="flex flex-col items-center ml-6">
                  <div>{geoData.weather[0].description}</div>
                  <div className="mt-1">
                    <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                    <span className="text-sm font-light text-gray-500">28°C</span>
                  </div>
                  <div>
                    <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                    <span className="text-sm font-light text-gray-500">20°C</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between mt-6">
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Wind</div>
                  <div className="text-sm text-gray-500">{geoData.wind.speed}m/s</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Humidity</div>
                  <div className="text-sm text-gray-500">68%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="font-medium text-sm">Visibility</div>
                  <div className="text-sm text-gray-500">10km</div>
                </div>
              </div>
            </div>
          </div>

        }
        {loading ? <button type="button" className="bg-indigo-500 ..." disabled>
          <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">

          </svg>
          Processing...
        </button> : null}
      </div>
    </>
  )
}

export default App

  // < div className = "min-h-screen flex items-center justify-center" >
  //   <div className="flex flex-col bg-white rounded p-4 w-full max-w-xs">
  //     <div className="font-bold text-xl">{geoData.name} <span className={`fi fi-${country.toLowerCase()}`}></span></div>
  //     <div className="text-sm text-gray-500">Thursday 10 May 2020</div>
  //     <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
  //       <img className='size-32 bg-red-500 rounded-full' src={`https://openweathermap.org/img/wn/${geoData.weather[0].icon}.png`} alt="Weather Icon" />
  //     </div>
  //     <div className="flex flex-row items-center justify-center mt-6">
  //       <div className="font-medium text-6xl">{geoData.main.temp}</div>
  //       <div className="flex flex-col items-center ml-6">
  //         <div>{geoData.weather[0].description}</div>
  //         <div className="mt-1">
  //           <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
  //           <span className="text-sm font-light text-gray-500">28°C</span>
  //         </div>
  //         <div>
  //           <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
  //           <span className="text-sm font-light text-gray-500">20°C</span>
  //         </div>
  //       </div>
  //     </div>
  //     <div className="flex flex-row justify-between mt-6">
  //       <div className="flex flex-col items-center">
  //         <div className="font-medium text-sm">Wind</div>
  //         <div className="text-sm text-gray-500">9k/h</div>
  //       </div>
  //       <div className="flex flex-col items-center">
  //         <div className="font-medium text-sm">Humidity</div>
  //         <div className="text-sm text-gray-500">68%</div>
  //       </div>
  //       <div className="flex flex-col items-center">
  //         <div className="font-medium text-sm">Visibility</div>
  //         <div className="text-sm text-gray-500">10km</div>
  //       </div>
  //     </div>
  //   </div>
  //     </div >