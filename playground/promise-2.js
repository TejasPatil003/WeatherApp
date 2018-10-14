const request = require('request');
const geocodeAddress = (address) => {
  return new Promise((resolve,reject) => {
    const encodedAddr = encodeURIComponent(address);
    request({
      url:`http://wwwmapquestapi.com/geocoding/v1/address?key=GVi7jIYkXAIC4Yi8nmADIgADLuzk4hQq&location=${encodedAddr}`,
      json:true
    },(error,response,body) => {
      if(body.status == 'ZERO_RESULTS'){
        reject('Unable to find address');
      }else if (error) {
        reject('Unable to access Google Server');
      }else{
        resolve({
          address:body.results[0].locations[0].street,
          lattitude:body.results[0].locations[0].displayLatLng.lat,
          longitude:body.results[0].locations[0].displayLatLng.lng
        })
        /*console.log('Address:',JSON.stringify(body.results[0].locations[0].street,undefined,2));
        console.log('Latitude:',JSON.stringify(body.results[0].locations[0].displayLatLng.lat,undefined,2));
        console.log('Longitude:',JSON.stringify(body.results[0].locations[0].displayLatLng.lng,undefined,2));*/
      }
    });
  })

}

geocodeAddress('00000').then((location) => {
  console.log(JSON.stringify(location,undefined,2));
}).catch((errorMsg) => {
  console.log(errorMsg);
});
