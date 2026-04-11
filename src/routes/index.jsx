import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SemuaData from "../pages/SemuaData";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App/>
            },
        ]
    },
]);