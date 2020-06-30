// let handler = {
//   // has as a property, each trap you want to set.
//   // get will run anytime anyone acces this object
//   // takes 2 args: 
//   // 1.target Object(the object acted on)
//   // 2 property that was accessed
//   get: (target, propName) =>{
//     // console.log(traget);
//     // console.log(propName);
//     return target[propName];
//   },
//   // set trap takes 3 args:
//   // 1. traget Object
//   // 2. Property that was set
//   // 3. New Value
//   set: (target, propName, newValue) => {
//     console.log(target);
//     console.log(propName);
//     console.log(newValue);
//     if(propName == "age" ){
//       if(typeof(newValue) !== "number"){
//         throw new TypeError("Age must be a valid number")
//       } else{
//         target[propName] = newValue;
//       }
//     } else {
//       target[propName] = newValue;
//     }
//   },
//   has:(target, propName) => {
//     console.log("Checking if has...");
//     return true;
//   }
// }

// let newObj = new Proxy({}, handler)
// newObj.name ="Rob";
// newObj.job = "instructor";
// newObj.age = 36;
// console.log("Age: ", newObj.age)
// // console.log(newObj.name)
// console.log("Age: ", newObj.age)
// newObj.age = 36;
// if("name" in newObj){
//   console.log(" I found it!");
// }

// Make a proxy out of a constructor/class object
class Car{
  constructor(make, model){
    this.make = make;
    this.model = model;
  }
  printInfo(){
    console.log(this.make, this.model);
  }
}
let handler = {
  get: (target, propName) => {
    console.log(`Someone is trying to get ${propName}`)
  }
}

let aCar = new Car(`toyota`, `camry`);
let carProxy = new Proxy(aCar, handler);
console.log(carProxy.make)


// apply trap
function sum(x, y){
  return x + y;
}
const handler ={
  // apply trap takes 3 args:
  // 1.target
  // 2.the this
  // 3. argumentList for this cale
  apply: (target, thisArg, argsList) => {
    console.log("Somone called a function")
    return target(argsList[0], argsList[1])
  }
}
const sumProxy = new Proxy(sum, handler)
console.log(sum(2, 9));
console.log(sumProxy(2, 9));
