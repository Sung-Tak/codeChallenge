import {FC, SyntheticEvent, useState} from "react"
import {MovieInfo} from "./Homepage";
import "./Movie.css"
interface IMovieProps{
    title:string;
    id:string;
    genres:string[]
}


const Movie: FC<IMovieProps> = ({title,id, genres}) =>{
    const [openDetail, setOpenDetail] = useState(false)
    const toggleDetails = () =>{
        setOpenDetail(!openDetail)
    }

    return <div className="movie-card" onClick={toggleDetails}>
        <img className="movie-img" src={process.env.PUBLIC_URL + `/Assets/PosterImgs/${id}.jpeg`} onError={(e)=> (e.target as HTMLImageElement).src = process.env.PUBLIC_URL + `/Assets/PosterImgs/defaultImage.jpeg`}/>
        {
            openDetail &&
            <div>
                <p>~GENRES~</p>
                {
                    
                    genres.map( genre=> {
                        return <p>{genre}</p>
                    })
                    
                }
            </div>
        }
        <h1>{title}</h1>
    </div>
}

export default Movie