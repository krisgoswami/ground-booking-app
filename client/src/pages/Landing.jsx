import React, { useState } from 'react';
import GroundCard from '../components/GroundCard';
import ImageSlider from '../components/ImageSlider';
import '../custom.css';

const Landing = () => {
    const groundsData = [ // Sample data for grounds
        { id: 1, name: 'Ground 1', location: 'Location 1', image: 'ground1.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        { id: 2, name: 'Ground 2', location: 'Location 2', image: 'ground2.jpg' },
        // Add more ground objects as needed
    ];

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (direction) => {
        const container = document.getElementById('groundContainer');
        const cardWidth = 350; // Adjust this value based on your card width
        const totalWidth = groundsData.length * cardWidth;
        const maxScroll = totalWidth - container.offsetWidth;

        if (direction === 'left') {
            setScrollPosition(Math.max(scrollPosition - container.offsetWidth, 0));
        } else if (direction === 'right') {
            setScrollPosition(Math.min(scrollPosition + container.offsetWidth, maxScroll));
        }
    };

    return (
        <div>
            {/* Banner Image Section */}
            <div className="relative h-96">
                <div className="absolute inset-0 bg-cover bg-center z-10" style={{ backgroundImage: 'url(banner.jpg)' }}></div>
                <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <h1 className="text-white text-4xl font-bold">Welcome to Ground Booking App</h1>
                </div>
            </div>

            {/* Image slider */}
            <ImageSlider />

            {/* Scroll Buttons */}
            <div className="flex justify-between mt-8">
                <button onClick={() => handleScroll('left')} className="bg-blue-500 text-white px-4 py-2 rounded-full">Scroll Left</button>
                <button onClick={() => handleScroll('right')} className="bg-blue-500 text-white px-4 py-2 rounded-full">Scroll Right</button>
            </div>

            {/* Grounds Section */}
            <div id="groundContainer" className="flex p-3 mx-auto mt-8 overflow-x-auto justify-between">
                <div className="flex justify-between mx-4 my-5" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                    {groundsData.map((ground) => (
                        <div key={ground.id} className="mr-5"> {/* Add margin to separate the cards */}
                            <GroundCard ground={ground} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;