// src/components/SidePanel.js

import React from 'react';

const SidePanel = () => {
    return (
        <div className="flex flex-col justify-between fixed inset-y-0 left-0 w-64 bg-blue-500 text-white p-4">
            <div className="flex items-center mb-8">
                <h2 className="text-2xl font-bold">Ground Booking</h2>
            </div>
            <ul className="space-y-2">
                <li>
                    <a href="#" className="block py-2">Home</a>
                </li>
                <li>
                    <a href="#" className="block py-2">Grounds</a>
                </li>
                <li>
                    <a href="#" className="block py-2">Create Ground</a>
                </li>
            </ul>
            <div className="mt-auto mb-5">
                <button className="bg-white text-blue-500 py-2 px-4 rounded-full block w-full mb-2">Logout</button>
            </div>
        </div>
    );
};

export default SidePanel;
