import Col from 'react-bootstrap/Col';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
import './App.css';

const timeDisplay = (dateNumeric) => {
    // date is in unix timestamp/utc?
    const options = {
        hour: "2-digit",
        minute: "2-digit",        
        hour12: false       
        }
    return (new Date(dateNumeric * 1000)).toLocaleTimeString("en-GB", options);
}

// const getIconURI = (iconId) => {
//     return "http://openweathermap.org/img/wn/" + iconId + "@2x.png";
// }

// const calculateColourFromTemp = (temp, min, max) => {
//     temp = Math.round(parseFloat(temp))
//     const maxTemp = max;
//     const minTemp = min;
//     const redVal = 255 / (maxTemp - minTemp) * (temp - minTemp);
//     const blueVal = 255 / (maxTemp - minTemp) * (maxTemp - temp);    

//     return "rgb(" + Math.round(redVal) + ",0," + Math.round(blueVal) + ")"
// }

function CurrentWeatherTimelineGraph(props){
    
    if (props.weather === undefined) {
        return (<></>);
    } else {

        const timeLineArr = props.weather.hourly.slice(0,12);

        let seriesX = 1;
        let tempData = [];

        timeLineArr.forEach((current, index) => {                        
            tempData.push({x: seriesX, y: current.temp});
            seriesX += 1;
        });
        let elWidth = document.getElementById('graphContainer').clientWidth;
        console.log("element width",elWidth);
        let elHeight = 200;
//console.log(tempData);
        return (<> 
                    <Col className="padding-0">
                        <XYPlot
                            width={elWidth}
                            height={elHeight}>
                            <HorizontalGridLines />
                            <LineSeries
                                data={tempData}/>
                            <XAxis title="Hours from now"/>
                            <YAxis title="Temperature"/>
                        </XYPlot>
                    </Col>
                </>
            );
    }
    // <Card>
    //                 <Card.Header>Weather for {dateDisplay(current.dt)}</Card.Header>
    //                 <Card.Body>
    //                     <Card.Title>Weather</Card.Title>
    //                     <Card.Text>
    //                     The minimum temperature for this day will be {current.temp.min}<br/>
    //                     The maximum temperature for this day will be {current.temp.max}                
    //                     </Card.Text>
    //                     <Button variant="primary">Go somewhere</Button>
    //                 </Card.Body>
    //             </Card>
}

export default CurrentWeatherTimelineGraph;