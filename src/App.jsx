
import Dashboard from "./Components/Dashboard/Dashboard";
import { Home } from "./Components/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login", 
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/register",
    element: (
      <div>
        <Register />
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <div>
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/",
    element: (
      <div>
        <Home />
      </div>
    ),
  },
]);
function App() {
  return (
    <>
      <div>
     <RouterProvider router={router}/>
      </div>
    </>
  );
}

export default App;
