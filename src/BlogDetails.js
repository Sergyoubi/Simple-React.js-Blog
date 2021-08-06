import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id } = useParams() //need to be destructured
  const { data: blog, isLoading, error } = useFetch(`http://localhost:7000/blogs/${ id }`); //data:blog = variable received(sended) from 'useFetch' is called data but call it 'blog'
  const history = useHistory();

  const handleClick = () => {
    fetch(`http://localhost:7000/blogs/${id}`, {
      method: 'DELETE'
    }).then(() => {
      history.push('/') //redirect to home page
    })
  }

  return ( 
    <div className="blog-details">
      { isLoading && <div>Loading...</div> }
      { error && <div>{error}</div> }
      { blog && ( 
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p> 
          <p className='blog-article'>{blog.body}</p>
          <button onClick={ handleClick }>Delete</button>
        </article>
      ) } 
    </div> 
  );
}
 
export default BlogDetails;