const request = require('request');

const geocodeAddress = (address,callback) => {
  const encodedAddr = encodeURIComponent(address);
  request({
    url:`http://www.mapquestapi.com/geocoding/v1/address?key=GVi7jIYkXAIC4Yi8nmADIgADLuzk4hQq&location=${encodedAddr}`,
    json:true
  },(error,response,body) => {
    if(body.status == 'ZERO_RESULTS'){
      callback('Unable to find address');
    }else if (error) {
      callback('Unable to access Google Server');
    }else{
      callback(undefined,{
        address:body.results[0].locations[0].street,
        lattitude:body.results[0].locations[0].displayLatLng.lat,
        longitude:body.results[0].locations[0].displayLatLng.lng
      })
      /*console.log('Address:',JSON.stringify(body.results[0].locations[0].street,undefined,2));
      console.log('Latitude:',JSON.stringify(body.results[0].locations[0].displayLatLng.lat,undefined,2));
      console.log('Longitude:',JSON.stringify(body.results[0].locations[0].displayLatLng.lng,undefined,2));*/
    }
  });
}
module.exports = {
  geocodeAddress
}
