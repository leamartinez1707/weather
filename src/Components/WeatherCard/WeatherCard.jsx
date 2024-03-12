export const WeatherCard = ({ geoData, country, date }) => {
    return (
        <div className="flex items-center justify-center bg-white/75 rounded-xl my-4">
            <div className="flex flex-col rounded-xl my-4 p-4 sm:p-6 w-full max-w-lg">
                <div className="font-bold text-xl">{geoData.name} <span className={`fi fi-${country.toLowerCase()}`}></span></div>
                <div className="text-sm text-gray-800">{date.toLocaleUpperCase()}</div>
                <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <img className='size-20 rounded-full p-0 bg-sky-300' src={`https://openweathermap.org/img/wn/${geoData.weather[0].icon}.png`} alt="Weather Icon" />
                </div>
                <div className="flex flex-row items-center justify-center mt-6">
                    <div className="font-medium text-3xl sm:text-5xl">{Math.round(geoData.main.temp)}°C</div>
                    <div className="flex flex-col items-center ml-6">
                        <div className='font-bold text-sm'>{geoData.weather[0].description.toLocaleUpperCase()}</div>
                        <div className="mt-1">
                            <span className="text-sm"><i className="far fa-long-arrow-up"></i></span>
                            <span className="text-sm font-light text-gray-800">Max: {Math.round(geoData.main.temp_max)}°C</span>
                        </div>
                        <div>
                            <span className="text-sm"><i className="far fa-long-arrow-down"></i></span>
                            <span className="text-sm font-light text-gray-800">Min: {Math.round(geoData.main.temp_min)}°C</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between mt-6">
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Viento</div>
                        <div className="text-sm text-gray-800">{Math.round(geoData.wind.speed * 3.6)}k/h</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Humedad</div>
                        <div className="text-sm text-gray-800">{geoData.main.humidity}%</div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="font-medium text-sm">Visibilidad</div>
                        <div className="text-sm text-gray-800">{geoData.visibility / 100}Km</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
