import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const dateDisplay = (dateNumeric) => {
    // date is in unix timestamp/utc?
    //return Date(dateNumeric);
    //const dateObj = new Date(dateNumeric * 1000);
    //utcString = dateObj.toUTCString();
    //time = utcString.slice(-11, -4);
    return new Date(dateNumeric * 1000);
}

function WeatherCard(props){
    if (props.weather === undefined) {
        return (<></>);
    } else {
        return props.weather.daily.map((current, index) => (
        <> 
            <Card>
                <Card.Header>Weather for {dateDisplay(current.dt).toString()}</Card.Header>
                <Card.Body>
                    <Card.Title>Weather</Card.Title>
                    <Card.Text>
                    The minimum temperature for this day will be {current.temp.min}<br/>
                    The maximum temperature for this day will be {current.temp.max}                
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>));
    }
    
}

export default WeatherCard;