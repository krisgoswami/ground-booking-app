import React from 'react';

const GroundCard = ({ ground }) => {
    return (
        <div className="bg-slate-500 w-80 p-4 shadow-lg rounded-md">
            <img src={ground.image} alt={ground.name} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2">{ground.name}</h3>
            <p className="text-gray-700 mb-2">{ground.location}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Book Now</button>
        </div>
    );
};

export default GroundCard;
