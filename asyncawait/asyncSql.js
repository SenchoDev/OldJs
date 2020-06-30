//take the user's username and passowrd and check if they exist
//if they do...
//update the token and send it back
// If they don't, then respond accordingly


const config ={
  host: "127.0.0.1",
  user: "x",
  password: "x",
  database: "promisesAsync"
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();
const username = 'bill';
const password = 'b';

const checkLoginQuery = `SELECT * from Users WHERE username = "${username}" AND password = "${password}`

// connection.query(checkLoginQuery, (error, results) => {
//   if(error){
//     throw error;
//   } else {
//     if(results.length === 1){
//       const updateTokenQuery = `UPDATE Users SET token = "$#$#%#SFS%LSJL:GJSKGJ:SGU*#:hjgdsklgjds;g" WHERE id = ${results[0].id}`
//     }
//   }
// })

function checkLogin(){
  return new Promise((resolve, reject) => {
    connection.query(checkLoginQuery, (errror, results)=> {
      if(error){
        reject(error)
      } else if(results.length  ==1){
        resolve(results[0].id)
      } else{
        resolve(false);
      }
    })
  })
}
async function updateToken(){
  console.log("Updating Token...")
  const usersId = await checkLogin();
  console.log("usersId")
  if(usersId){
    const updateTokenQuery = `UPDATE Users SET token = "aghoi3hghsgad3gs34" WHERE id = ${usersId}`
    connection.query(updateTokenQuery,(error, results) =>{

    })
    console.log("User Updated")

  }

}

updateToken();
