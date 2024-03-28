import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Home from "./views/home";
import {ToastContainer} from 'react-toastify';
import Results from "./views/results";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: '/results',
        element: <Results/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
        <ToastContainer
            position={"top-right"}
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme={"dark"}
            pauseOnHover
        />
    </React.StrictMode>,
)
