const request = require('request');
const temperature = (lattitude,longitude,callback) => {
  request({
    url:`https://api.darksky.net/forecast/14b3aea5586fc7dae7b28cf0952cc656/${lattitude},${longitude}`,
    json:true
  },(error,response,body) => {
    if(error){
      callback('Unable to connect forecast.io server');
    }else if(response.statusCode === 400){
      callback('Unable to fetch weather');
    }else if(response.statusCode === 200){
      callback(undefined,{
        address:body.timezone,
        temperature:body.currently.temperature,
        apprentTemperature:body.currently.apparentTemperature
      });
    }

  });
}

module.exports = {
  temperature
}
//37.8267,-122.4233
