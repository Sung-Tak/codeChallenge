import { FC } from "react"
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
    return <div className="checkbox-container">
        {
            
        allGenres.sort().map(genre =>{
            return <div className="checkbox-group"><input type="checkbox" name={genre} value={genre} onChange={handleChange}/>
            <label htmlFor={genre} >{genre}</label><br />
            </div>
        })
        }
    
    </div>
}
export default FilterGenre