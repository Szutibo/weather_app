import React, { useState } from 'react';

function App() {
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState({});
  const api = {
    key: '4489bb7707c0485f10b5890f21a93f9a',
    base: 'https://api.openweathermap.org/data/2.5/'
  };
  const [error, setError] = useState('');

  const search = e => {
    if (!cityName) {
      setError('Kérem adjon meg egy várost!');
    } else {
        if (e.key === 'Enter') {
          fetch(`${api.base}weather?q=${cityName}&units=metric&lang=hu&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
              setWeather(result);
              setCityName('');
            });
        }
    }
  }

  const dateBuilder = (d) => {
    const months = ['Január', 'Február', 'Március', 'Április', 'Május', 'Június', 'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December'];
    const days = ['Vasárnap', 'Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${year} ${month} ${date} ${day}`;
  }

  return (
    <div className={
      (typeof weather.main != 'undefined')
        ? (weather.main.temp > 26)
          ? 'app hot'
          : (weather.main.temp < 10)
            ? 'app cold'
            : 'app'
        : 'app'
    }>
      <main>
        <div className='searchBox'>
          <input
            type="text"
            onChange={(e) => setCityName(e.target.value)}
            placeholder='Keresés...'
            className='searchBar'
            value={cityName}
            onKeyUp={search}
            onClick={() => setWeather({})}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className='locationBox'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className='weatherBox'>
              <div className='temperature' onClick={() => {
                console.log(weather);
              }}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className='weather'>
                {weather.weather[0].description}
              </div>
            </div>
          </div>
        )
        : (
          <div className='errorBox'>
            {error}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
