
import { Link } from "react-router";

export const Footer = () => {
    return (
        <footer className="relative min-h-[300px] text-gray-300 overflow-hidden">
            {/* Crimson Core Glow Background */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), radial-gradient(68% 58% at 50% 50%, #c81e3a 0%, #a51d35 16%, #7d1a2f 32%, #591828 46%, #3c1722 60%, #2a151d 72%, #1f1317 84%, #141013 94%, #0a0a0a 100%), radial-gradient(90% 75% at 50% 50%, rgba(228,42,66,0.06) 0%, rgba(228,42,66,0) 55%), radial-gradient(150% 120% at 8% 8%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(150% 120% at 92% 92%, rgba(0,0,0,0) 42%, #0b0a0a 82%, #070707 100%), radial-gradient(60% 50% at 50% 60%, rgba(240,60,80,0.06), rgba(0,0,0,0) 60%), #050505",
                }}
            />
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.5) 100%)",
                    opacity: 0.95,
                }}
            />

            {/* Footer Content */}
            <div className="relative z-10 bg-transparent pt-12 pb-8">
                <div className="max-w-2xl mx-auto flex flex-col items-center px-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-extrabold pt-4 pb-8">
                        <p className="font-extrabold text-3xl tracking-tight font-sans -translate-x-3">
                            Event
                        </p>
                        <p className="ml-2 text-base font-semibold font-sans translate-x-3">
                            Management
                        </p>
                    </Link>

                    {/* Contact Details */}
                    <div className="text-center text-sm text-gray-400 mb-6">
                        <div className="mb-6 flex items-center justify-center space-x-4 divide-x text-slate-300 divide-gray-700">
                            <a href="mailto:info@bretaworld.com" className="hover:text-white pr-4">
                                info@events.com
                            </a>
                            
                        </div>
                        <div className="mb-2">8121 Jame St#9, Concord, ON, L4K, 5L8, Canada</div>
                        <div>152. Colaba Chambers, Ground Floor, S.B. Singh Road, Colaba, Mumbai - 400005.</div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-t border-gray-800 my-6"></div>

                    {/* Copyright */}
                    <div className="text-xs text-gray-500 text-center">
                        © 2025 Event Management Surfaces. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};
