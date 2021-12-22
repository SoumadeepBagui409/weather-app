const request = require('postman-request');
var url = "http://api.weatherstack.com/current?access_key=ce8a693a874fe66123e4119055226c6b&query="

const weather = (coordinate,callback)=>{
    const URL = url+coordinate.latitude+","+coordinate.longitude;
    request({url:URL,json:true},(error,response)=>{
        if(error){
            callback('Unable to fetch please try again',undefined);
        }else if(response.body.error){
            callback('unable to locate or free request API call is over for the month',undefined);
        }else{
            callback(undefined,{
                temprature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                windSpeed: response.body.current.wind_speed,
                percip: response.body.current.precip,
                humidity: response.body.current.humidity,
                visiblity: response.body.current.visibility,
                is_day: response.body.current.is_day
            })
        }
    })
}


module.exports = weather;