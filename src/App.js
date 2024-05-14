import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';


function App() {
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [main, setMain] = useState('');
  const [descr,setDescr ] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise,setSunrise] = useState('');
  const [sunset,setSunset] = useState('');
  const [isReady, setReady] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  let date1 = new Date();

let date = date1.toLocaleString("fr-FR", {
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
});
  
const handleSubmit = (event) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=04f1842ba3c7503c3053331feccdc406&units=metric`)
  .then((result) => result.json())
  .then((jsonresult) => {
    setCity(jsonresult.name);
    setTemp(jsonresult.main.temp);
    setDescr(jsonresult.weather[0].description);
    setMain(jsonresult.weather[0].main);
    setIcon(jsonresult.weather[0].icon);
    setSunset(jsonresult.sys.sunset);
    setSunrise(jsonresult.sys.sunrise);
    setReady(true);
  })
  .catch((err) => console.error(err));
  event.preventDefault(); }

  React.useEffect(() => { 
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=12.5833&lon=-16.2719&appid=5ffd351118cfb0822789a0fdc4c21d8d&units=metric')
     .then(result => result.json())
     .then(jsonresult => {
     setCity(jsonresult.name);
     setTemp(jsonresult.main.temp);
     setMain(jsonresult.weather[0].main);
     setDescr(jsonresult.weather[0].description);
     setIcon(jsonresult.weather[0].icon);
     setSunrise(jsonresult.sys.sunrise);
     setSunset(jsonresult.sys.sunset);
     setReady(true);
     })
     .catch(err => console.error(err))
    }, [])
    if (isReady) {
      return (
      <div>
        
      <h1 className='city-name'>My Weather App</h1>
      <div className="weather-container">
        <table>
          <tr>
            <td><strong>City</strong></td>
            <td>{city}</td>
          </tr>
          <tr>
            <td><strong>Température</strong></td>
            <td>{temp} °C</td>
          </tr>
          <tr>
            <td> <strong>Main</strong></td>
            <td>{main}</td>
          </tr>

          <tr>
            <td><strong>Description</strong></td>
            <td>{descr}</td>
          </tr>
          <tr>
            <td> <strong>Illustration</strong></td>
            <td><img  src= {`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Icône météo" /></td>
          </tr>
          <tr>
            <td><strong>Sunrise </strong></td>
            <td>{new Date(sunrise).toLocaleTimeString()}</td>
          </tr>
          <tr>
            <td> <strong>Sunset</strong></td>
            <td>{new Date(sunset).toLocaleTimeString()}</td>
          </tr>
        </table>
      <div className='con'>
      <h1> Put coordinates</h1>
          <fieldset className='form-container'>
             <form onInput={handleSubmit}>
             <strong> Latitude :</strong> <br></br> <input onChange={e => setLatitude(e.target.value)} value={latitude} /><br />
             <strong>Longitude :</strong><br></br><input onChange={e => setLongitude(e.target.value)} value={longitude} /><br />
          </form>
          </fieldset>

      </div>
       
         
        </div>
        </div>

      );
    } else {
      return <div>En cours ...</div>;
     
    }
}

export default App;
