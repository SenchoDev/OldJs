const apiKey = `e9ddb24aed6d48c4342303aba5269e28`;
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const imgUrl = `http://image.tmdb.org/t/p/w300/`;



// let globalMovieData = [];
// $.ajax({
//   url: apiUrl+"Interstellar",
//   method: `get`,
//   success: (movieData) => {
//     console.log(movieData)
//     globalMovieData = movieData.result
//   }
// })

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

document.getElementById('movie-form').addEventListener('submit', function (event) {
  event.preventDefault();
  // console.log('Form submitted');
  const movieTitleArray = Array.from(document.getElementsByClassName('movie-title'));

  const moviePromises = movieTitleArray.map((inputElement) => {
    return getMovieData(inputElement.value);
  });
  Promise.all(moviePromises).then((promiseData) => {
    document.getElementById('movies').innerHTML = `
    <img src=${imgUrl}${promiseData[0][0].poster_path} >
    <img src=${imgUrl}${promiseData[0][0].poster_path} >
    <img src=${imgUrl}${promiseData[0][0].poster_path} >

    `
  }).catch((errorMsg) => {
    console.log(errorMsg);
  })
})
  // const movieData = getMovieData(movieTitle);
  // console.log(movieData);
  // movieData.then((data)=> {
  //   document.getElementById('movies').innerHTML = `<img src=${imgUrl}${data[0].poster_path} >`
  // }).catch((errorMsg) =>{
  //   console.log(errorMsg);
  // })
