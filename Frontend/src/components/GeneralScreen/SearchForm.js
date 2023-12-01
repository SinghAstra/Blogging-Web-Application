import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [search,setSearch] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(prev=>prev.trim())
        if(search){
            navigate(`?search=${search}`)
        }
    }
  return (
    <form onSubmit={handleSubmit}>
        <input type='text'
        placeholder='search...'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        <button type='submit'>Search</button>
    </form>
  )
}

export default SearchForm