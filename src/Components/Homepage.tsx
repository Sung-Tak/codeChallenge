import {FC, useEffect, useState} from "react"
import Searchbar from "./Searchbar"
import Movie from "./Movie"
import FilterGenre from "./FilterGenre"
import "./Homepage.css"
import { arrayBuffer } from "stream/consumers"
export interface MovieInfo{
    id: string
    title: string
    genres: string[]
}

const Homepage:FC = () =>{
    const [data, setData] = useState<MovieInfo[]>([])
    const [movieList, setMovieList] = useState<MovieInfo[]>([])
    const [value, setValue] = useState<string>("")
    const [filter, setFilter] = useState<string[]>([])
    const [allGenres, setAllGenres] = useState<string[]>([])
    let isFiltered = false
    let hasValue = false
    useEffect(()=>{
        fetch(
            "https://code-challenge.spectrumtoolbox.com/api/movies", {
            headers: {
            Authorization: "Api-Key q3MNxtfep8Gt",
             }
            }).then(res=> res.json()).then(movies=> {
                setData(movies.data)
                setMovieList(movies.data)
                let genres: string[] = []
                movies.data.map((movieItem: any)=> movieItem.genres.map((genreItem: string)=> genres.push(genreItem)))
                setAllGenres(genres.filter((genre, i, arr) => arr.indexOf(genre) === i))
            })

        },[])

    useEffect(()=>{

        setMovieList(
            data.filter(movieItem=>{
                if(value.length === 0 && filter.length === 0){   
                    return true
                }
                if(value.length > 0 && filter.length === 0){
                    return movieItem.title.toLowerCase().includes(value)
                }
                if(value.length === 0 && filter.length > 0){
                    return filter.every(genre=> {
                        return movieItem.genres.indexOf(genre) !== -1;
                    })
                }
                else{
                    //return movieItem.genres.every(genre=> filter.includes(genre)) && movieItem.title.toLowerCase().includes(value)
                    return filter.every(genre=> {
                        return movieItem.genres.indexOf(genre) !== -1;
                    }) && movieItem.title.toLowerCase().includes(value)
                }
            })
        )
    }, [value, filter])

    return <div className="home-container">
        <Searchbar setValue={setValue}/>
        <div className="layout">
        <div className="filter-sidebar">
            <FilterGenre setFilter={setFilter} allGenres={allGenres}/>
        </div>
        <ul className="movie-container">
        {   (movieList.length !== 0) ?
           movieList.map((movie) => {        
                return <Movie key={movie.id} {...movie} />
            })
            : <h1 className="no-results">no results were found</h1>
        }
        </ul>
        </div>
    </div>
}

export default Homepage