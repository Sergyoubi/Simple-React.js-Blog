import { useState } from "react";
import { useHistory } from 'react-router-dom'

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('Author 1') //the initial value to be  shown (selected)
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault() 
    const blog = { title, body, author };

    setIsLoading(true)

    fetch('http://localhost:7000/blogs', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('New Blog added')
      setIsLoading(false)
      history.push('/') //go to '/' route
    })
      
  };

  return ( 
    <div className='create'>
      <h2>Add a new blog</h2>
      {/* we don't put handleSubmit() inside an anonymous function bcz we want to invoke 
      it immediately when we press the button */}
      <form onSubmit={handleSubmit}> 
        <label>Blog Tilte:</label>
        <input type="text" value={ title } onChange={ (e) => setTitle(e.target.value) } required/>
        <label>Blog Body:</label>
        <textarea value={ body } onChange={ (e) => setBody(e.target.value) } required>
        </textarea>
        <select value={ author } onChange={ (e) => setAuthor(e.target.value) }>
          <option value="author 1">Author 1</option>
          <option value="author 2">Author 2</option>
          <option value="author 3">Author 3</option>
          <option value="author 4">Author 4</option>
        </select>
        { !isLoading && <button>Add Blog</button> } {/*showed first bcz isLoading is set to true*/}
        { isLoading && <button disabled>Adding Blog...</button> } {/*showed when adding new blog bcz isLoading is set to false again*/}
      </form>
    </div>
  );
}
 
export default Create;