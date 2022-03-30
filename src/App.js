
import './App.css';
import { ApiClient } from './ApiClient';
import { useState,useEffect} from 'react';
import WeatherCard from './WeatherCard';

function App() {

  const [weather, changeWeather] = useState(undefined);
  const api = new ApiClient();

  useEffect(() => {
   api.getWeather()
   .then((response) => {
     changeWeather(response.data);
     console.log(response.data);
   });

}, []);

  useEffect(() => {
      if (weather === undefined) {
        console.log("Weather data not received yet.");        
      } else
      {
        displayWeather();
      }
  }, [weather])

  const displayWeather = (weather) => {

  }

  return (
    <div className="App">
      <WeatherCard weather={weather}/>
    </div>
  );
}

export default App;
