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
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/fetch-grounds/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
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

    useEffect(() => {
        getGroundDetails();
    }, []);

    return (
        <div>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-4">{groundData.name}</h2>
                <p className="text-lg mb-2">{groundData.location}</p>
                <p className="text-gray-700 mb-8">{groundData.description}</p>
                {/* Add more details here */}
            </div>
        </div>
    )
}

export default GroundDetails;