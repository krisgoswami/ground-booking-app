import React, { useEffect, useState } from 'react';
import GroundCard from '../components/GroundCard';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const Grounds = () => {
    const [grounds, setGrounds] = useState([]);

    const getAllGrounds = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/grounds`);
            console.log("data is", data);
            if (data.success) {
                setGrounds(data.grounds);
            }
            console.log(grounds);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllGrounds();
    }, []);
    console.log(grounds);

    return (
        <div className='flex flex-wrap justify-start gap-5'>
            {grounds?.map((ground) =>
                <div key={ground?._id} className="ml-10 mt-10">
                    <GroundCard
                        id={ground?._id}
                        name={ground?.ground_name}
                        location={ground.location}
                        price={ground.price}
                        image={ground?.images[0]}
                    />
                </div>
            )}
        </div>
    )
}

export default Grounds