import React from 'react'
import { BookingCard } from '../components/GroundCard';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { useEffect } from 'react';
import { useState } from 'react';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const getBookings = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/bookings`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log("data is", data);
            if (data.success) {
                setBookings(data.bookings);
            }
            // console.log(grounds);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getBookings();
    }, []);

    return (
        <div>
            <p className='ml-10 mt-5 mb-5 font-bold text-3xl'>Your Bookings</p>
            <div className='flex flex-wrap justify-start gap-5'>
                {bookings?.map((booking) =>
                    <div key={booking?._id} className="ml-10 mt-5">
                        <BookingCard
                            id={booking?._id}
                            ground={booking?.ground}
                            date={booking?.date.slice(0, 10)}
                            time={booking?.timeSlot}
                        />
                    </div>
                )}
                {bookings.length === 0 &&
                    <p className='ml-10 mt-5 mb-5 font-bold text-xl'>You don't have any bookings yet.</p>}
            </div>
        </div>
    )
}

export default Bookings;