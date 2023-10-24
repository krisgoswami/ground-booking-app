import React from 'react';
import { useNavigate } from 'react-router-dom';

const GroundCard = ({ id, name, location, price }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-slate-500 w-80 p-4 shadow-lg rounded-md">
            <img src={''} alt={name} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-gray-700 mb-2">{location}</p>
            <p className="text-gray-700 mb-2">{price}</p>
            <button
                onClick={() => {
                    navigate(`/ground/${id}`);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-full">
                View
            </button>
        </div>
    );
};

export default GroundCard;
