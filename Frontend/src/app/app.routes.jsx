import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

export const routes=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
    }
])