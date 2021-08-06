import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController(); //what we can do with it is we can associate it with a specific fetch request
    //use the abortController as a second parameter in fetch fn
    //then we can use the AbortController to stop the fetch. 
    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
      .then(res => {
        if(!res.ok){
          throw Error('Could not fetch the Data for that resourse')
        }
        return res.json() 
      })
      .then(data => {
        setData(data)
        setIsLoading(false)
        setError(null)
      })
      .catch((err) => {
        if (err.name === 'AbortError') {  //if we abort the fetch and if the name is 'AbortError', we don't update the state just console.log(Fetch aborted)
          console.log('Fetch aborted')
        } else { //but if the error is another error, update the state
          setError(err.message)
          setIsLoading(false)
        }      
      })
    }, 500)

    return () => abortController.abort(); //abort whatever fetch associated with it
  },[url])

  return { data, isLoading, error }
}
export default useFetch;
