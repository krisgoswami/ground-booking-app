import React, { useState } from 'react';

const ImageSlider = () => {
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        // Add more image URLs as needed
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative bg-black opacity-80 text-white w-full h-96 overflow-hidden">
            {images.map((image, index) => (
                <img
                    key={index}
                    src={''}
                    alt={`Image ${index + 1}`}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                />
            ))}
            <button onClick={handlePrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full focus:outline-none">
                Prev
            </button>
            <button onClick={handleNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full focus:outline-none">
                Next
            </button>
        </div>
    );
};

export default ImageSlider;
