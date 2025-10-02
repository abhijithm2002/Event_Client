import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../ReduxStore/store";

interface IProtectedRoute {
    children: JSX.Element;
    authRequired?: boolean; // true = only logged-in users can access
    redirectIfAuth?: boolean; // true = redirect logged-in users away (like login/register)
    redirectPath?: string;
}

export const ProtectedRoute = ({ children, authRequired = false, redirectIfAuth = false, redirectPath = "/" }: IProtectedRoute) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (authRequired && !isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    if (redirectIfAuth && isAuthenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};
