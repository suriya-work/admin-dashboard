import { createBrowserRouter } from "react-router-dom";
import Login from "./features/identity/components/login";
import Register from "./features/identity/components/register";

const router = createBrowserRouter([
    {
        path: "login",
        element: <Login />
    },
    {
        path:"register",
        element:<Register />
    }
])

export default router;