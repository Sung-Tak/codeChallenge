import {useEffect, useState} from "react"
import MovieDetails from "./MovieDetails"
import "./Movie.css"
interface IMovieProps{
    title:string
    id:string
    genres:string[]
    setCurrentMovieID: React.Dispatch<React.SetStateAction<string>>
    currentMovieID: string
}

const Movie = ({title,id, genres, setCurrentMovieID, currentMovieID}:IMovieProps) =>{
    //const [openDetail, setOpenDetail] = useState(false)
    const toggleDetails = () =>{
        currentMovieID === id ? setCurrentMovieID("") : setCurrentMovieID(id)
        
    }
    
    return <div className="movie-card" onClick={toggleDetails}>
        <img 
        className="movie-img" 
        src={process.env.PUBLIC_URL + `/Assets/PosterImgs/${id}.jpeg`} 
        onError={(e)=> (e.target as HTMLImageElement).src = process.env.PUBLIC_URL + `/Assets/PosterImgs/defaultImage.jpeg`}
        alt={"Movie Poster"}
        />
        {
            currentMovieID === id &&
            <MovieDetails id={id}/>
        }
        {
            currentMovieID !== id &&
            <h1>{title}</h1>
        }
    </div>
}

export default Movie