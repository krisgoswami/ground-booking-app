import axios from 'axios';
import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';

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
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/ground/${id}`);
            if (data?.success) {
                setGround(data?.ground);
                setInputs({
                    name: data?.ground.ground_name,
                    description: data?.ground.description,
                    price: data?.course.price,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>GroundDetails</div>
    )
}

export default GroundDetails;