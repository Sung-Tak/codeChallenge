import React, { FC, useState } from "react"
import "./Searchbar.css"
type IValues = {
  setValue: React.Dispatch<React.SetStateAction<string>>
};

const Searchbar: FC<IValues> = ({ setValue }) => {
  const [search, setSearch] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.currentTarget.value)
    setSearch(e.currentTarget.value)
    setValue(e.currentTarget.value.toLowerCase())
  };

  return (
    <input
      className="searchbar"
      type="text"
      onChange={handleChange}
      value={search}
      placeholder="Search By Title..."
    ></input>
  )
}
export default Searchbar
