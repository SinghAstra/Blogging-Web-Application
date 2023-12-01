import React from 'react'
import { Link } from 'react-router-dom'

const CardBlog = ({ blog }) => {

  const parseDate = (createdAt) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const d = new Date(createdAt);
    var datestring = d.getDate() + " " +monthNames[d.getMonth()] + " ," + d.getFullYear() 
    return datestring
}

const trimContent = (content) => {
    const trimmedString = content.substr(0, 73);
    return trimmedString
}
const trimTitle= (title) => {
    const trimmedString = title.substr(0, 69);
    return trimmedString
}
  
  return (
    <Link to={`/blog/${blog.slug}`}>
      <div>
        <img src={blog.image} alt='blog' />
        <h3>{blog.title.length > 76 ? trimTitle(blog.title)+"..." : blog.title}</h3>
        <p dangerouslySetInnerHTML={{__html : trimContent( blog.content) +"..."}}></p>
        <p>Created At : {parseDate(blog.createdAt)}</p>
      </div>
    </Link>
  )
}

export default CardBlog