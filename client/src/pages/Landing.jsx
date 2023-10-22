import React, { useEffect, useState } from 'react';
import GroundCard from '../components/GroundCard';
import ImageSlider from '../components/ImageSlider';
import '../custom.css';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const Landing = () => {

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


    const groundsData = [ // Sample data for grounds
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        { id: 1, ground_name: 'Ground 1', location: 'Location 1', price: '1600' },
        // Add more ground objects as needed
    ];

    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (direction) => {
        const container = document.getElementById('groundContainer');
        const cardWidth = 350; // Adjust this value based on your card width
        const totalWidth = grounds.length * cardWidth;
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
            {/* <div className="relative h-96">
                <div className="absolute inset-0 bg-cover bg-center z-10" style={{ backgroundImage: 'url(banner.jpg)' }}></div>
                <div className="absolute inset-0 bg-black opacity-50 z-20"></div>
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <h1 className="text-white text-4xl font-bold">Welcome to Ground Booking App</h1>
                </div>
            </div> */}

            {/* Image slider */}
            <ImageSlider />

            {/* Scroll Buttons */}
            <div className="flex w-full absolute z-10 justify-between mt-40">
                <button onClick={() => handleScroll('left')} className=" text-white m-1 rounded-full">
                    <img className='w-10' src="../src/images/la.svg" alt="left arrow" />
                </button>
                <button onClick={() => handleScroll('right')} className="text-white m-1 rounded-full">
                    <img className='w-10' src="../src/images/ra.svg" alt="right arrow" />
                </button>
            </div>

            {/* Grounds Section */}
            <div id="groundContainer" className="flex mx-16 mt-8 overflow-x-auto justify-between relative">
                <div className="flex justify-between my-5" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                    {grounds?.map((ground) =>
                        <div key={ground?._id} className="mr-5">
                            <GroundCard
                                name={ground?.ground_name}
                                location={ground.location}
                                price={ground.price}
                            // images={ground?.images}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Landing;
