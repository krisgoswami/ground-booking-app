import axios from 'axios';
import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';
import { useState } from 'react';
import { useEffect } from 'react';

const GroundDetails = () => {

    const navigate = useNavigate();
    const id = useParams().id;
    const [ground, setGround] = useState({});
    const [inputs, setInputs] = useState({});
    const [grounds, setGrounds] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');


    const getGroundDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/fetch-ground/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                setGround(data?.ground);
                setInputs({
                    name: data?.ground.ground_name,
                    location: data?.ground.location,
                    description: data?.ground.description,
                    price: data?.ground.price,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getGroundDetails();
    }, []);

    return (
        <div>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">{inputs.name}</h2>
                <p className="text-lg mb-2">{inputs.location}</p>
                <p className="text-gray-700 mb-8">{inputs.description}</p>
                <p className="text-gray-700 mb-8">{inputs.price}</p>
            </div>
        </div>
    )
}

export default GroundDetails;