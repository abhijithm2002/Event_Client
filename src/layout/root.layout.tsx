import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import { Footer } from "../common/footer";
// import { ScrollToTop } from "../utils/scrollToTop";

export const RootLayout = () => {
    const location = useLocation();

    // Hide navbar on login and register pages
    const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            {/* <ScrollToTop/> */}
            {!hideNavbar && <Navbar />}
            <main className="max-w-[1920px] min-h-[70vh] mx-auto">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
