import React from "react";
//import {Nav} from "react-bootstrap";
//import { withRouter } from "react-router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './App.css';
//import './dashboard.css';

const dateDisplay = (dateNumeric, day=true) => {
    // date is in unix timestamp/utc?
    //return Date(dateNumeric);
    //const dateObj = new Date(dateNumeric * 1000);
    //utcString = dateObj.toUTCString();
    //time = utcString.slice(-11, -4);
    const optionsDay = {
        weekday: "short",        
        day:"2-digit",
        //month:"long"        
        }

    const optionsMonth = {
        //weekday: "long",        
        //day:"2-digit",
        month:"long"        
        }

    const dtDate = new Date(dateNumeric * 1000);

    if (day) {
        return (dtDate.toLocaleDateString("en-GB", optionsDay));    
    } else {
        return (dtDate.toLocaleDateString("en-GB", optionsMonth));    
    }
}

const getIconURI = (iconId) => {
    return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
}

const calculateColourFromTemp = (temp, min, max) => {
    temp = Math.round(parseFloat(temp))
    const maxTemp = max;
    const minTemp = min;
    const redVal = 255 / (maxTemp - minTemp) * (temp - minTemp);
    const blueVal = 255 / (maxTemp - minTemp) * (maxTemp - temp);    

    return "rgb(" + Math.round(redVal) + ",0," + Math.round(blueVal) + ")"
}

const weatherLinks = (props) => {
    //console.log(weather.daily[0].weather.icon);
    // style={{backgroundImage: `url(${getIconURI(current.weather[0].icon)})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}    
    
    // work out the min/max temp for the week so we can use the colour calculator to 
    // determine the background colour for the sidebar buttons.
    
    const dailyArr = props.weather.daily;
    var maxTemp = 0;
    var minTemp = 0;

    dailyArr.forEach((element) => {
        if (maxTemp < element.temp.max) {
            maxTemp = element.temp.max;
        }
        if (minTemp > element.temp.max) {
            minTemp = element.temp.max;
        }
    });

    return props.weather.daily.map((current, index) => (
        <>       
        <Row className="padding-0 widthSBRow" xs={1} lg={1} sm={1} style={{backgroundColor: (calculateColourFromTemp(current.temp.max, minTemp, maxTemp))}}>
            <Col className="dailyContainer padding-0">   
                <div className="navDateDisplay padding-0">
                    <span>{dateDisplay(current.dt,true)}<br/>
                    {dateDisplay(current.dt,false)}</span>            
                </div>
                <div className="sidebarContainer padding-0">
                    <button onClick={() => props.dispDetailedWeather(index)} className="dailyButton">
                    <img className="circularDiv" alt="icon for weather" height={32} width={32} src={`${getIconURI(current.weather[0].icon)}`}></img><br/>
                        Min: {current.temp.min}&#8451;&nbsp;
                        Max: {current.temp.max}&#8451;&nbsp;<br/>
                        {current.weather[0].description}&nbsp;<br/>
                        Wind Speed (Knots): {current.wind_speed}
                    </button>
                </div>                             
            </Col>           
        </Row>
        </>
    ));
}

const weatherLinksOld = (props) => {
    //console.log(weather.daily[0].weather.icon);
    // style={{backgroundImage: `url(${getIconURI(current.weather[0].icon)})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}    
    return props.weather.daily.map((current, index) => (
        <>       
        <Row className="padding-0">
            <Col className="padding-0">   
                <p className="navDateDisplay">{dateDisplay(current.dt)}</p>
                <Row className="padding-0">                
                    <Col className="sidebarContainer padding-0">
                        <img alt="icon for weather" height={32} width={32} src={`${getIconURI(current.weather[0].icon)}`}></img>
                        <button onClick={() => props.dispDetailedWeather(index)} className="dailyButton">
                            Min: {current.temp.min}&#8451;&nbsp;
                            Max: {current.temp.max}&#8451;&nbsp;
                            {current.weather[0].description}&nbsp;
                            Wind Speed (Knots): {current.wind_speed}
                        </button>
                    </Col>
                </Row>        
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