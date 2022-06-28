import React, { FC } from "react"
import "./FilterGenre.css"
type IFilter = {
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
    allGenres: string[]
}
const FilterGenre: FC<IFilter> = ({setFilter, allGenres}) =>{

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value

        setFilter(prev=> {
            if(prev.includes(val)){
                return [...prev.filter(genre => genre !== val)]
            }
            return [...prev, val]
        })
    }
    /*
    const handleClear = (e:React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.target)
    }
    */
    return <div className="checkbox-container">
        {
            //<button onClick={handleClear}>Clear filters</button>
        }
        {
            
        allGenres.sort().map((genre,i) =>{
            return <div className="checkbox-group" key={i}><input type="checkbox" name={genre} value={genre} onChange={handleChange}/>
            <label htmlFor={genre} >{genre}</label><br />
            </div>
        })
        }
    
    </div>
}
export default FilterGenre