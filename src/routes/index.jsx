import { createBrowserRouter } from "react-router-dom"; // Import fungsi yang benar
import App from "../App";
import Signup from "../pages/Signup";
import Guide from "../pages/Guide";
import OauthSuccess from "../pages/OauthSuccess";

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
        path: "/guide",
        element: <Guide />,
      },
      {
        path: "/oauth-success",
        element: <OauthSuccess />,
      },
    ],
  },
]);
