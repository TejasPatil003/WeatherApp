console.log(`Starting app`);

setTimeout(()=>{
  console.log(`Inside a callback`);
},2000);

setTimeout(() => {
  console.log('Second timeout');
},0);

console.log(`Finishing up`);
