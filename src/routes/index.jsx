import { createBrowserRouter } from "react-router-dom"; // Import fungsi yang benar
import App from "../App";
import Signup from "../pages/Signup";
import OauthSuccess from "../pages/OauthSuccess";
import Dashboard from "../pages/Dashboard";
import SemuaData from "../pages/SemuaData";
import Detail from "../pages/Detail";
import AddFood from "../pages/AddFood"; 
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/oauth-success",
        element: <OauthSuccess />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "foods",
        element: <SemuaData />,
      },
      {
        path: "detail/:id",
        element: <Detail />,
      },
      {
        path: "foods/add",
        element: <AddFood />,
      },
    ],
  }
]);
