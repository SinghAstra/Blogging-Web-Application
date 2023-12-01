import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import CardBlog from '../BlogScreen/CardBlog';

const Home = () => {
  const query = useLocation().search;
  const searchKey = new URLSearchParams(query).get('search')
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchBlogs = async()=>{
      setLoading(true);
      const query = searchKey?`?search=${searchKey}`:'';
      const {data} = await axios.get(`${process.env.REACT_APP_DB_URI}api/blog/getAllBlogs`+query);
      console.log("data is ",data);
      setBlogs(data.blogs);
      setLoading(false);
    }
    fetchBlogs();
  },[searchKey])

  useEffect(()=>{
    setPage(1);
  },[searchKey])

    return (
    <div>
        <Header/>
        {loading?<>Loading...</>:<div>
        {blogs.length !== 0 ? 
          blogs.map((blog)=>{
            return <CardBlog key={blog._id} blog={blog}/>
          }):
          <h3>No Blogs Found.</h3>
        }  
        </div>}
    </div>
  )
}

export default Home