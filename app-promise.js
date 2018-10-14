const yargs = require('yargs');
const axios = require('axios');

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

var encodedAddr = encodeURIComponent(argv.address);
var geoCodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=GVi7jIYkXAIC4Yi8nmADIgADLuzk4hQq&location=${encodedAddr}`;

axios.get(geoCodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS'){
    throw new Error('GeoCode Records not found');
  }
  var lat = response.data.results[0].locations[0].displayLatLng.lat;
  var lon = response.data.results[0].locations[0].displayLatLng.lng;
  var weatherUrl = `https://api.darksky.net/forecast/14b3aea5586fc7dae7b28cf0952cc656/${lat},${lon}`;
  return axios.get(weatherUrl);
  //console.log(JSON.stringify(response.data,undefined,2));
}).then((response) => {
  console.log(`Tempreture is ${response.data.currently.temperature} but it feel like ${response.data.currently.temperature}`);
}).catch((e) => {
  if(e.code === 'ENOTFOUND'){
    console.log(`Unable to connect API Server`);
  }else{
    console.log(e.message);
  }

})
