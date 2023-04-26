import React, { useEffect, useState } from 'react'
import axios from './axios'
import './Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const base_url='https://image.tmdb.org/t/p/original/'

function Row({ title, fetchUrl , isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl , setTrailerUrl]=useState('');

    //un código que solo corre bajo variables especificas
    useEffect(()=>{
async function fetchData(){
const request = await axios.get(fetchUrl)
//"https://api.themoviedb.org/3"
setMovies(request.data.results)
return request
}
fetchData();
    },[fetchUrl])


    const opts = {
        height:"390",
        width:"100%",
        playerVars:{
            //https://developers.google.com/youtube/player_parameters?hl=es
            autoplay:1,
        },
    };

    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }else {
            movieTrailer(movie?.title || movie?.original_trailer ||movie?.name )
            .then((url)=> {
           //https://www.youtube.com/watch?v=QPzmsQ86_HM&list=WL&index=2
           const urlParams = new URLSearchParams(new URL(url).search);// te da ésto: ?v=QPzmsQ86_HM&list=WL&index=2 
           setTrailerUrl(urlParams.get('v'));
           console.log(movie.title);
            })
            .catch((error) => console.log(error))
        }
    }

  return (
    <div>
        {/* container -> posters */}

        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {/*several 'row__poster(s)'  */}
                {movies.map(movie =>(
                    <img
                        key={movie.id}
                        onClick={()=>handleClick(movie)}
                        className={`row__poster ${isLargeRow && `row__posterLarge`}`}
                        src={`${base_url}${isLargeRow? movie.poster_path: movie.backdrop_path}`} 
                        alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    </div>
  )
}

export default Row