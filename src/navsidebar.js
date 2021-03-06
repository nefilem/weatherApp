import React from "react";
//import {Nav} from "react-bootstrap";
//import { withRouter } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './dashboard.css'

const dateDisplay = (dateNumeric) => {
    // date is in unix timestamp/utc?
    //return Date(dateNumeric);
    //const dateObj = new Date(dateNumeric * 1000);
    //utcString = dateObj.toUTCString();
    //time = utcString.slice(-11, -4);
    const options = {
        weekday: "long",        
        day:"2-digit",
        month:"long"        
        }
    return (new Date(dateNumeric * 1000)).toLocaleDateString("en-GB", options);
}

const getIconURI = (iconId) => {
    return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
}

const weatherLinks = (props) => {
    //console.log(weather.daily[0].weather.icon);
    // style={{backgroundImage: `url(${getIconURI(current.weather[0].icon)})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}    
    return props.weather.daily.map((current, index) => (
        <>       
        <Row>
            <Col>           
                    <p className="navDateDisplay">{dateDisplay(current.dt)}</p>
                    <img alt="icon for weather" height={64} width={64} src={`${getIconURI(current.weather[0].icon)}`}></img>        
                    <button onClick={() => props.dispDetailedWeather(index)} className="dailyButton">
                        Min: {current.temp.min}&#8451;&nbsp;
                        Max: {current.temp.max}&#8451;<br />
                        {current.weather[0].description}<br />
                        Wind Speed (Knots): {current.wind_speed}<br />
                    </button>
                   
            </Col>
        </Row>
        </>
    ));
}

const Sidebar = (props) => {

    if (props.weather === undefined) {
        return (<></>);
    } else {
        return (
            <>
                <Container>                    
                    {weatherLinks(props)}
                </Container>
            
            </>
            );
        }
  };
  //const Sidebar = withRouter(Side);
  export default Sidebar;