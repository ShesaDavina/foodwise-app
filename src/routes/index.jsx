import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import SemuaData from "../pages/SemuaData";
import Detail from "../pages/Detail";
import AddFood from "../pages/AddFood";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "foods",
                element: <SemuaData />
            },
            {
                path: "detail/:id",
                element: <Detail />
            },
            {
                path: "foods/add",
                element: <AddFood />
            },
        ]
    },
]);