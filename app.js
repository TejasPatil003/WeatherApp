const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const tempretureObj = require('./weather/weather.js');
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            description: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address,(errorMsg,result) => {
    if(errorMsg){
      console.log(errorMsg);
    }else{
      var lat = result.lattitude;
      var lon = result.longitude;
      tempretureObj.temperature(lat,lon,(error,result) => {
          if(error){
            console.log('Error',error);
          }else{
            console.log(`In ${result.address} currently temperature is ${result.temperature} but it feels like ${result.apprentTemperature}`);
          }
      });
    }
});
//14b3aea5586fc7dae7b28cf0952cc656
