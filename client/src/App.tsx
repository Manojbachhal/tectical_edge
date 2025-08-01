// App.tsx or App.jsx
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import routes from "./routes/config";
import { useRoutes } from "react-router-dom";

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
