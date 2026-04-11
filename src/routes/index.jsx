import { createBrowserRouter } from "react-router-dom"; // Import fungsi yang benar
import App from "../App";
import Login from "../pages/Login";
import Signup from "../pages/Signup"; 

export const router = createBrowserRouter([
  { 
    path: "/",
    children: [
      {
        path: "/", 
        element: <App />
      },
      {
        path: "/login", 
        element: <Login />
      },
      {
        path: "/signup", 
        element: <Signup />
      },
    ]
  }
]);