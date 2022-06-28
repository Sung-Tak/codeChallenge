import {useEffect, useState} from "react"
import "./Movie.css"
interface IMovieProps{
    title:string;
    id:string;
    genres:string[]
}
interface IMovieData{
    description: string;
    duration: number;
    genres: string[];
    moods: string[];
    releaseDate: string
    releaseYear: number;
    title: string;
    topCast: ICast[]
}

type ICast = {
    name: string;
    characterName: string;
}
const Movie = ({title,id, genres}:IMovieProps) =>{
    const [openDetail, setOpenDetail] = useState(false)
    const [movieData, setMovieData] = useState<IMovieData>()
    const toggleDetails = () =>{
        setOpenDetail(!openDetail)
    }
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

    },[id])
    return <div className="movie-card" onClick={toggleDetails}>
        <img 
        className="movie-img" 
        src={process.env.PUBLIC_URL + `/Assets/PosterImgs/${id}.jpeg`} 
        onError={(e)=> (e.target as HTMLImageElement).src = process.env.PUBLIC_URL + `/Assets/PosterImgs/defaultImage.jpeg`}
        alt={"Movie Poster"}
        />
        {
            openDetail &&
            <div className="movie-details">
                <p>Genres: {genres.join(", ")}</p>
                <p>Length: {calculateDuration()}</p>
                <p>Release Date: {movieData?.releaseDate}</p>
                <p>Release Year: {movieData?.releaseYear}</p>
                <p>Description: {movieData?.description}</p>
                <div> ~~ Casts ~~~
                {
                    movieData?.topCast.map(cast=>{
                        return <p>{cast.characterName} played by {cast.name}</p>
                    })
                }
                </div>
            </div>
        }
        <h1>{title}</h1>
    </div>
}

export default Movie