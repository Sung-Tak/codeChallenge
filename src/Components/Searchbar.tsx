import React, {useState} from "react"


type IValues = {
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Searchbar = ({setValue}:IValues) =>{
    const [search, setSearch] = useState<string>("")

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.currentTarget.value)
        setSearch(e.currentTarget.value)
        setValue(e.currentTarget.value.toLowerCase())
    }

    return <input 
    style={{position:"fixed", height:"2em", width:"400px", fontSize: "1.5em", left:"40%"}} 
    type="text" onChange={handleChange} 
    value={search}
    placeholder="Search By Title..."
    ></input>

}
export default Searchbar