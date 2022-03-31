import './App.css';
import { ApiClient } from './ApiClient';
import { useState,useEffect} from 'react';
import WeatherCard from './WeatherCard';
import CurrentWeatherTimeline from './CurrentWeatherTimeline';
import {Container, Row, Col, Card, Form, Button, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./navsidebar";

function App() {

  const [weather, changeWeather] = useState(undefined);
  const [detailWeather, changeDetailWeather] = useState(undefined);
  const [weatherLocation, setLocation] = useState("Sheffield");

  const api = new ApiClient();  

  useEffect(() => {
   api.getWeatherByLocation(weatherLocation)
   .then((response) => {
     changeWeather(response.data);
     console.log(response.data);
   });
}, []);

useEffect(() => {
  api.getWeatherByLocation(weatherLocation)
  .then((response) => {
    changeWeather(response.data);
    console.log(response.data);
  });
}, [weatherLocation]);
  
  useEffect(() => {
      if (detailWeather === undefined) {
        console.log("Weather data not received yet.");        
      } else
      {
        //displayDetailedWeather();
        console.log("detailWeather Changed")
      }
  }, [detailWeather])

  const displayDetailedWeather = (index) => {    
    changeDetailWeather(weather.daily[index]);
  }

  const handleLocationChange = (event) => {
    //alert(event.key);
    //event.preventDefault();
    console.log("");
    if(event.keyCode == 13) {
      setLocation(event.target.value);
     // alert(event.target.value)
    }
    return;
  }

  return (  
    <div className="App">      
      <Container>
        <row xs={12} md={12} lg={12}>         
        <FormControl
            type="text"
           defaultvalue="Sheffield"
            onKeyUp={handleLocationChange}
          />
        </row>
        <Row xs={12} md={12} lg={12}> <p className="navDateDisplay">Next 12 Hours</p></Row>        
        <Row xs={12} md={12} lg={12}>
          <CurrentWeatherTimeline weather={weather}/>
        </Row><br/>
        <Row xs={12} md={12} lg={12}><p className="navDateDisplay">8 Day Forecast</p></Row>
        <Row xs={12} md={12} lg={12}>
          <Col xs={4} md={4} lg={4}>
            <Container>
              <Sidebar weather={weather} dispDetailedWeather={(index) => displayDetailedWeather(index)}/>
            </Container>
          </Col>        
          <Col xs={8} md={8} lg={8}>
            <WeatherCard weather={detailWeather}/>            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
