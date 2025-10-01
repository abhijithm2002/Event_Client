import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import { RootLayout } from '../layout/root.layout'
import { createBrowserRouter } from "react-router";
import Events from '../pages/Events';
import AllEvents from '../pages/AllEvents';
import EventDetails from '../pages/EventDetails';
export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "addEvent",
                element: <Events />,
            },
            {
                path: "events",
                element: <AllEvents />,
            },
            {
                path: "events/:id",
                element: <EventDetails />,
            },
        ],
    },
]);
