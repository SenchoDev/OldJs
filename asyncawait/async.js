function one(){
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve("2 seconds have passed!");
    },2000)

  })
}
async function two(){
  console.log('Calling function one');
  const oneResponse = await one();
  console.log(oneResponse);
}


// console.log("Callingfunction one");
// one().then((promiseData)=>{
//   console.log(promiseData);
// })
two();

console.log("Last line of the code")