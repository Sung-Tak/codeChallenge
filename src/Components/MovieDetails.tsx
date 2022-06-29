import {FC, useState, useEffect} from "react"
import "./MovieDetails.css"
interface IMovieDetailsProp{
    id: string
}
interface IMovieData{
    description: string
    duration: number
    genres: string[]
    moods: string[]
    releaseDate: string
    releaseYear: number
    title: string
    topCast: ICast[]
}
type ICast = {
    name: string;
    characterName: string;
}
const MovieDetails:FC<IMovieDetailsProp> = ({id}) =>{
    const [movieData, setMovieData] = useState<IMovieData>()

    const calculateDuration = ()=>{
        let total = movieData?.duration ? movieData?.duration : 0
        let hours = Math.floor(total / 3600);
        total %= 3600;
        let minutes = Math.floor(total / 60);
        let seconds = total % 60;
        return `${hours}hr(s) ${minutes} min ${seconds}sec`
    }

    useEffect(()=>{
        fetch(`https://code-challenge.spectrumtoolbox.com/api/movies/${id}`,{
            headers: {
                Authorization: "Api-Key q3MNxtfep8Gt",
                 }
                }).then(res=> res.json()).then(data=> setMovieData(data.data))

    },[])

    return <div className="movie-details">
        <p>Genres: {movieData?.genres.join(", ")}</p>
                <p>Length: {calculateDuration()}</p>
                <p>Release Date: {movieData?.releaseDate}</p>
                <p>Release Year: {movieData?.releaseYear}</p>
                <p>Description: {movieData?.description}</p>
                <div> ~~ Casts ~~~
                {
                    movieData?.topCast.map((cast,index)=>{
                        return <p key={index}>{cast.characterName} played by {cast.name}</p>
                    })
                }
                </div>
    </div>
}

export default MovieDetails