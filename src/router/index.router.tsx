import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import { RootLayout } from '../layout/root.layout';
import { createBrowserRouter } from "react-router";
import Events from '../pages/Events';
import AllEvents from '../pages/AllEvents';
import EventDetails from '../pages/EventDetails';
import MyTickets from '../pages/MyTickets';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { 
                path: "login", 
                element: (
                    <ProtectedRoute redirectIfAuth redirectPath="/">
                        <Login />
                    </ProtectedRoute>
                ),
            },
            { 
                path: "register", 
                element: (
                    <ProtectedRoute redirectIfAuth redirectPath="/">
                        <Register />
                    </ProtectedRoute>
                ),
            },
            { 
                path: "addEvent", 
                element: (
                    <ProtectedRoute authRequired redirectPath="/login">
                        <Events />
                    </ProtectedRoute>
                ),
            },
            { path: "events", element: <AllEvents /> },
            { path: "events/:id", element: <EventDetails /> },
            { path: "tickets", element: <MyTickets /> },
        ],
    },
]);
