import React from 'react'
import GroundCard, { BookingCard } from '../components/GroundCard';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { useEffect } from 'react';
import { useState } from 'react';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/bookings`, {
                headers: {
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
        getAllBookings();
    }, []);

    return (
        <div className='flex flex-wrap justify-start gap-14'>
            {bookings?.map((booking) =>
                <div key={booking?._id} className="ml-10 mt-5">
                    <BookingCard
                        id={booking?._id}
                        user={booking?.user}
                        ground={booking?.ground}
                        date={booking?.date.slice(0, 10)}
                        time={booking?.timeSlot}
                    />
                </div>
            )}
        </div>
    )
}

export default Bookings;