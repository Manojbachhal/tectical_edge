import axios from "axios";
import { useEffect, useState } from "react";
import NoMovieContainer from "./components/NoMovieContainer";
import { CiCirclePlus } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import Pagination from "./components/Pagination";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function getLimitBasedOnScreen() {
  const width = window.innerWidth;
  if (width >= 1024) return 8; // 4 columns
  if (width >= 768) return 6; // 3 columns
  return 6; // 2 or 1 column
}

function Movie() {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [apiError, setApiError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(getLimitBasedOnScreen());

  const navigate = useNavigate();
  const location = useLocation();

  // Update limit on screen resize
  useEffect(() => {
    const handleResize = () => {
      setLimit(getLimitBasedOnScreen());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (location.state?.toastSuccess) {
      toast.success(location.state.toastSuccess);
      navigate(location.pathname, { replace: true });
    }
    if (location.state?.toastError) {
      toast.error(location.state.toastError);
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${BASE_URL}/auth/movies/?page=${currentPage}&size=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovieList(response.data.data.items || []);
        setTotal(response.data.data.total || 0);
      } catch (error: any) {
        const message = error?.response?.data?.message || "Failed to fetch movies";
        setApiError(message);
        toast.error(message);
      }
    };

    fetchMovies();
  }, [currentPage, limit]);

  const handleCreateMovie = () => {
    navigate("/create-movie");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="defaultTheme min-h-screen bg-[#093545] px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl font-bold flex items-center gap-2">
          My Movies
          <CiCirclePlus
            size={22}
            onClick={handleCreateMovie}
            className="hover:cursor-pointer hover:text-cyan-400"
          />
        </h1>
        <button
          className="text-white flex items-center gap-2 text-base font-semibold"
          onClick={handleLogOut}
        >
          Logout <LuLogOut size={20} />
        </button>
      </div>

      {movieList.length > 0 ? (
        <>
          <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center">
            {movieList.map((movie) => (
              <div key={movie.id} className="bg-[#224957] rounded p-1 shadow-lg w-full">
                <img
                  src={movie.filePath}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="text-white text-lg font-semibold truncate">{movie.title}</h3>
                <p className="text-gray-300">{movie.year}</p>
              </div>
            ))}
          </div>
          <Pagination
            total={total}
            limit={limit}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (
        <div className="flex justify-center mt-10">
          <NoMovieContainer />
        </div>
      )}
    </div>
  );
}

export default Movie;
