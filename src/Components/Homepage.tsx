import {useEffect, useState, lazy, Suspense} from "react"
import Searchbar from "./Searchbar/Searchbar"
//import Movie from "./Movie"
import FilterGenre from "./FilterGenre"
import "./Homepage.css"
import { arrayBuffer } from "stream/consumers"
import { isElementAccessExpression } from "typescript"

const Movie = lazy(()=> import("./Movie"))
export interface MovieInfo{
    id: string
    title: string
    genres: string[]
}

const Homepage = () =>{
    //constructor
    const [data, setData] = useState<MovieInfo[]>([])
    const [movieList, setMovieList] = useState<MovieInfo[]>([])

    //for filtering movies
    const [value, setValue] = useState<string>("")
    const [filter, setFilter] = useState<string[]>([])
    const [allGenres, setAllGenres] = useState<string[]>([])

    //for opening only 1 movie detail at a time
    const [currentMovieID, setCurrentMovieID] = useState<string>("")

    //for pagination
    const [usePagination, setUsePagination] = useState(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(Math.floor((window.innerWidth-100)/220))

    const handleWindowSizeChange = () => {
        const pageSize = Math.floor((window.innerWidth-100)/220)
        if(pageSize !== perPage){
            if(pageSize === 0){
                setPerPage(1)
            }
            else{
                setPerPage(pageSize)
            }
        }
        if(currentPage > Math.floor(movieList.length/pageSize)){
            setCurrentPage(Math.floor(movieList.length/pageSize))
        }
    }

    useEffect(()=>{
        fetch(
            "https://code-challenge.spectrumtoolbox.com/api/movies", {
            headers: {
            Authorization: "Api-Key q3MNxtfep8Gt",
             }
            }).then(res=> res.json()).then(movies=> {
                setData(movies.data)
                setMovieList(movies.data)
                //console.log(movies.data)
                let genres: string[] = []
                movies.data.map((movieItem: any)=> movieItem.genres.map((genreItem: string)=> genres.push(genreItem)))
                setAllGenres(genres.filter((genre, i, arr) => arr.indexOf(genre) === i))
            })
    
        },[])

    useEffect(()=>{

        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    },[perPage])
    useEffect(()=>{

        setMovieList(
            data.filter(movieItem=>{
                //return movieItem.genres.every(genre=> filter.includes(genre)) && movieItem.title.toLowerCase().includes(value)
                return filter.every(genre=> {
                    return movieItem.genres.indexOf(genre) !== -1;
                }) && movieItem.title.toLowerCase().includes(value)
            })
        )
    }, [value, filter])


    return <div className="home-container">
        <Searchbar setValue={setValue}/>
        <div className={usePagination ? "layout-pagination" : "layout"}>
        <div className="filter-sidebar">
            <FilterGenre setFilter={setFilter} allGenres={allGenres}/>
        </div>
        <div className="movie-container">
            <button className="show-button" onClick={()=> {
                setUsePagination(!usePagination) 
            }}
            >{usePagination ? "show all" : "show less"}</button>
        {
            usePagination ?
            <>
            <div className="movie-pagination">
                <Suspense fallback={<h2>Loading...</h2>}>
                {
                    (movieList.length !== 0 && perPage > 0) ? 
                    movieList.slice(currentPage*perPage, currentPage*perPage+perPage).map((movie) => {    
                        console.log(perPage*currentPage + " to "+ (currentPage*perPage+perPage))    
                        return <Movie key={movie.id} {...movie} setCurrentMovieID={setCurrentMovieID} currentMovieID={currentMovieID} />
                    }) 
                    : <h1 className="no-results">no results were found</h1>

                }</Suspense>
            </div>
            <div className="pagination-buttons">
                <button onClick={()=>{
                    if(currentPage > 0) setCurrentPage(prev=>prev-1)
                }}>Prev</button>
                <p>{currentPage+1}/ {Math.floor((movieList.length-1)/perPage)+1}</p>
                <button onClick={()=>{
                    if(currentPage < Math.floor((movieList.length-1)/perPage)) setCurrentPage(prev=>prev+1)
                }}>Next</button>
            </div>
            </>
            :
            <div className="movie-no-pagination">
                <Suspense fallback={<h2>Loading...</h2>}>
                {   (movieList.length !== 0) ?
                movieList.map((movie) => {        
                        return <Movie key={movie.id} {...movie} setCurrentMovieID={setCurrentMovieID} currentMovieID={currentMovieID} />
                    })
                    : <h1 className="no-results">no results were found</h1>
                }</Suspense>
            </div>
        }
        </div>
        </div>
    </div>
}

export default Homepage