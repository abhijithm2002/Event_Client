import { Outlet } from "react-router";
import Navbar from "../common/Navbar";
// import { Footer } from "../components/common/footer";
// import { ScrollToTop } from "../utils/scrollToTop";

export const RootLayout = () => {
    return (
        <>
            {/* <ScrollToTop/> */}
            <Navbar />
            <main className="max-w-[1920px] min-h-[70vh] mx-auto">
                <Outlet />
            </main>
            {/* <Footer /> */}
        </>
    );
};
