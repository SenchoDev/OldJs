const apiKey = `e9ddb24aed6d48c4342303aba5269e28`;
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const imgUrl = `http://image.tmdb.org/t/p/w300/`;

const peopleUrl = `https://api.themoviedb.org/3/person`;
const castUrl = `https://api.themoviedb.org/3/movie`;


function getMovieData(movieTitle) {
  return new Promise((resovle, reject) => {
    $.ajax({
      url: apiUrl + movieTitle,
      method: `get`,
      success: (movieData) => {
        // console.log(movieData);
        resovle(movieData.results)
      },
      error: (errorMsg) => {
        reject(errorMsg);
      }
    })
  })
}


function getCast(movie){
  //console.log(movie);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${castUrl}/${movie.id}/credits?api_key=${apiKey}`,
      method: 'get',
      success: (castData)=>{
        resolve(castData.cast[0]);
      },
      error: (errorMsg) => {
        reject(errorMsg);
      }
    })
  })

}

function getPerson(person){
  return new Promise((resolve, reject)=> {
    $.ajax({
      url: `${peopleUrl}/${person.id}?api_key=${api_key}`,
      success: (personData)=> {
        resolve(personData);
      },
      error: (errorMsg) => {
        reject(errorMsg);
      }
    })
  })

}

document.getElementById('movie-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const movieElem = Array.from(document.getElementsByClassName('movie-title'));
  const moviePromise = getMovieData(movieElem[0].value);
  moviePromise.then((movieData) =>{
    //console.log(movieData);
    return getCast(movieData[0]);

  }).then((castInfo) => {
    console.log(castInfo);
    return getPerson(castInfo);
  }).then((personInfo) => {
    console.log(personInfo);
  }).catch((error) => {
    console.error(error);
  })
});

// $.ajax({
//   url: `${apiUrl}rocky`,
//   method: `get`,
//   success: (movieData) => {
//     $.ajax({
//       url: `${apiUrl}titanic`,
//       method: `get`,
//       success: (movieData2) => {
//         // console.log(movieData2);
//         $.ajax({
//           url: `${apiUrl}grease`,
//           method: `get`,
//           success: (movieData3) => {
//             // console.log(movieData3);
//             console.log(movieData.results);
//             console.log(movieData2.results);
//             console.log(movieData3.results)''
//           },
//           error: (errorMsg3) => {
//             reject(errorMsg3);
//           }
//         })
//       },
//       error: (errorMsg2) => {
//         reject(errorMsg2);
//       }
//     })
//   },
//   error: (errorMsg) => {
//     reject(errorMsg);
//   }
// })