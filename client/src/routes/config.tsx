import type { RouteObject } from "react-router-dom";
import LoginForm from "../pages/auth/Login/Login";
import Movie from "../pages/Movie/Movie";
import SignupForm from "../pages/auth/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import CreateMovies from "../pages/Movie/components/CreateMovies";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Movie />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-movie",
    element: (
      <PrivateRoute>
        <CreateMovies />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginForm />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignupForm />
      </PublicRoute>
    ),
  },
  // Add more routes here
];

export default routes;
