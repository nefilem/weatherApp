import axios from "axios";

export class ApiClient {
  
  // docs from openweathermap api site
  // https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
  // Parameters
  // lat, lon	required	Geographical coordinates (latitude, longitude)
  // appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)
  // exclude	optional	By using this parameter you can exclude some parts of the weather data from the API response. It should be a comma-delimited list (without spaces).
  // Available values:
  
  // current
  // minutely
  // hourly
  // daily
  // alerts
  // units	optional	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more
  // lang	optional	You can use the lang parameter to get the output in your language. Learn more
  //d646f0637546233656e7899d2cd2cfc8

    apikey = "";
    lat = "53.3811";
    lon = "1.4701";
    part = "hourly,minutely";

    responseStatusCheck(responseObject) {
        if(responseObject.status >= 200 && responseObject.status < 300){
          return Promise.resolve(responseObject);
    
        }else{
          return Promise.reject(new Error(responseObject.statusText));
        }
   
   
     }

     getItems(url){
        return axios
        .get(url)
        .then(this.responseStatusCheck)
        .catch((error) => {
            console.log(error);

        })        
     }

     
    getWeather(){
      // console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=${this.part}&appid=${this.apikey}`);
      console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=${this.part}&appid=${this.apikey}&units=metric`);
        return this.getItems(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=${this.part}&appid=${this.apikey}&units=metric`);
//console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apikey}`);
        // return this.getItems("https://api.openweathermap.org/data/2.5/weather?lat=53.3811&lon=1.4701&appid=d646f0637546233656e7899d2cd2cfc8");      
    }

}