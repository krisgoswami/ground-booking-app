import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
    const images = [
        'versus 1',
        'versus 2',
        'versus 3',
        'versus 4',
        'versus 5',
        'versus 6',
        // Add more image URLs as needed
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 3000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative text-white w-full h-screen overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-60 z-20"></div>
            <div className="absolute inset-0 flex items-center justify-center z-30">
                <h1 className="text-white text-4xl font-bold">Welcome to Ground Booking App</h1>
            </div>

            {images.map((image, index) => (
                <img
                    key={index}
                    src={`../src/images/${image}.jpg`}
                    alt={`Image ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
            {/* <button onClick={handlePrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full focus:outline-none">
                Prev
            </button>
            <button onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full focus:outline-none">
                Next
            </button> */}
        </div>
    );
};

export default ImageSlider;
