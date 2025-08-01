import { useNavigate } from "react-router-dom";
function NoMovieContainer() {
  const navigate = useNavigate();
  const handleAddMovie = () => {
    navigate("/create-movie");
  };
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-[40px] text-white text-[500]">Your movie list is empty</p>
      <button
        className="bg-[#2BD17E] w-[200px] text-[14px] p-2 rounded text-white mt-4"
        onClick={handleAddMovie}
      >
        Add a new movie
      </button>
    </div>
  );
}

export default NoMovieContainer;
