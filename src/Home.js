import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Home = () => {
  const { data, isLoading, error } = useFetch(' http://localhost:7000/blogs ');

  return (
    <div className="home">
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && <BlogList blogs={data} title="All Blogs!"/>} 
    </div>
  );
}

export default Home;