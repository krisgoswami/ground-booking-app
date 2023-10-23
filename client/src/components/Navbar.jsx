
import React, { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="p-4">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-black font-bold text-xl">Ground Booking App</div>
                    <div className="block lg:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
                        <div className="lg:flex items-center justify-between text-lg gap-4">
                            <a href="#" className="text-black">Home</a>
                            <a href="#" className="text-black">About</a>
                            <a href="#" className="text-black">Contact</a>
                            <button className="bg-blue-500 text-white ml-10 px-4 py-2 rounded-lg">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
