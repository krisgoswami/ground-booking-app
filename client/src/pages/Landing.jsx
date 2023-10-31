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
        <div className="relative">

            {/* Image Slider */}
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
            <div id="groundContainer" className="flex mx-4 sm:mx-16 my-8 overflow-x-auto justify-between relative">
                <div className="flex justify-between my-5" style={{ transform: `translateX(-${scrollPosition}px)`, transition: 'transform 0.3s' }}>
                    {grounds?.map((ground) =>
                        <div key={ground?._id} className="mr-5">
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
            </div>
        </div>
    );
};

export default Landing;
