import { LucideX, SearchIcon } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
// import { SearchBar } from './SearchBar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [navTheme, setNavTheme] = useState<"transparent" | "white">("transparent");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        const scrollThemeChange = () => {
            window.scrollY >= 40 ?
                setNavTheme("white") :
                setNavTheme("transparent");
        };
        document.addEventListener("scroll", scrollThemeChange, { passive: true })

        return () => {
            document.removeEventListener("scroll", scrollThemeChange)
        }
    }, [])

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed z-50 w-full transition-colors duration-600 shadow border-b border-white ${navTheme === "white" ? "navbar-transition" : "bg-foreground/25 backdrop-blur-xs hover:bg-white text-white hover:text-foreground"}`}>
                <div className="flex items-center justify-between h-20 px-4 md:px-8">
                    {/* Left: Nav Links (Desktop) */}
                    <div className="hidden md:flex w-1/3 justify-start space-x-6 font-amsterdam-two animate-in fade-in duration-400 font-medium">
                        <Link to="/" className="hover:text-primary transition-colors">
                            home
                        </Link>
                        <Link to="/events" className="hover:text-primary transition-colors">
                            Events
                        </Link>
                        <Link to="/addEvent" className="hover:text-primary transition-colors">
                            Add Event
                        </Link>
                        {/* <Link to="/contact" className="hover:text-primary transition-colors">
                            contact
                        </Link> */}
                    </div>

                    {/* Center: Logo */}
                    <div className={`flex justify-start md:justify-center ${isSearchFocused ? 'w-fit' : 'flex-1'} md:w-1/3 ps-2 md:ps-0`}>
                        <Link to="/" className="text-2xl font-extrabold">
                            {/* PIETRA */}
                            {/* <img src="/pietra-logo.png" alt="" /> */}
                            <p className="font-extrabold text-3xl tracking-tight font-sans -translate-x-3">
                                Brēta
                            </p>
                            <p className="ml-2 text-base font-semibold font-sans translate-x-3">
                                by pietra
                            </p>
                        </Link>
                    </div>

                    {/* Right: Search bar and Cart */}
                    {/* <div className={`flex ${isSearchFocused ? "grow" : ""} md:w-1/3 justify-end`}>
                        <SearchBar isFocused={isSearchFocused} setIsFocused={setIsSearchFocused} />
                    </div> */}

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden hover:text-primary"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay - Outside navbar container */}
            <div
                className={`md:hidden fixed inset-0 bg-black/50 transition-opacity duration-300 z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Sidebar - Outside navbar container */}
            <div className={`md:hidden fixed top-0 right-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-20 relative">
                    <button
                        className='absolute top-6 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors'
                        onClick={() => setIsOpen(false)}
                    >
                        <LucideX className='text-primary w-6 h-6' />
                    </button>
                    <div className="flex-1 space-y-2 px-6 font-amsterdam-two">
                        <Link to="/" className="block py-3 text-foreground hover:text-primary border-b border-gray-100" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/products" className="block py-3 text-foreground hover:text-primary border-b border-gray-100" onClick={() => setIsOpen(false)}>Products</Link>
                        <Link to="/about" className="block py-3 text-foreground hover:text-primary border-b border-gray-100" onClick={() => setIsOpen(false)}>About</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar
