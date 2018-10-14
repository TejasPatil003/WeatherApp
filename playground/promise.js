const asyncAdd = (a,b) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else{
        reject('Arguments must be number');
      }
    },1500)
  })
}
asyncAdd(7,5).then((res) => {
  console.log('Result :',res);
  return asyncAdd(res,33);
}).then((res) => {
  console.log('New Result is',res);
}).catch((errorMsg) => {
  console.log(errorMsg);
})


// var somePromise = new Promise((resolve,reject) => {
//     resolve('Hey ! It worked. ')
// });
//
// somePromise.then((obj) => {
//   console.log(obj);
// });
