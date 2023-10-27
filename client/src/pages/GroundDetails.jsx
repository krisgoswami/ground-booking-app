import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import ImageViewer from 'react-simple-image-viewer';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { set } from 'date-fns';

const GroundDetails = () => {

	const token = localStorage.getItem('token');
	const email = localStorage.getItem('email');
	const navigate = useNavigate();
	const id = useParams().id;
	const [inputs, setInputs] = useState({});
	const [isViewerOpen, setIsViewerOpen] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const [ground, setGround] = useState({});
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

	const handleDateChange = date => {
		// Use the 'set' function to explicitly set the timezone to UTC
		const adjustedDate = set(date, { hours: 5, minutes: 30, seconds: 0, milliseconds: 0 });
		setSelectedDate(adjustedDate);
	};


	//global state
	let isLogin = useSelector((state) => state.isLogin);
	isLogin = isLogin || localStorage.getItem('userId');


	const openImageViewer = (index) => {
		setCurrentImage(index);
		setIsViewerOpen(true);
	};

	const closeImageViewer = () => {
		setCurrentImage(0);
		setIsViewerOpen(false);
	};

	const getGroundDetails = async () => {
		try {
			const { data } = await axios.get(`${BASE_URL}/api/v1/user/ground/${id}`, {
				headers: {
					'Authorization': `Bearer ${token}`,
				}
			});
			console.log(data);
			if (data?.success) {
				setGround(data?.ground);
				setInputs({
					name: data?.ground.ground_name,
					location: data?.ground.location,
					description: data?.ground.description,
					price: data?.ground.price,
					images: data?.ground.images,
					availableSlots: data?.ground.availableSlots,
				})
			}
			// console.log(inputs.availableSlots);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getGroundDetails();
	}, []);

	const bookGround = async (e) => {
		e.preventDefault();
		if (selectedDate === "" || selectedTimeSlot === "") {
			toast.error("Select date and time");
			return;
		}
		try {
			const { data } = await axios.post(`${BASE_URL}/api/v1/user/book-slot/${id}`, {
				date: selectedDate,
				timeSlot: selectedTimeSlot,
			}, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			});
			if (data.success) {
				toast.success("Ground booked!");
				navigate('/bookings');
			}
		} catch (error) {
			console.log(error);
			toast.error("already booked");
		}
	}

	return (
		<div className="bg-green-50 h-screen p-8">
			<form onSubmit={bookGround}>
				<h2 className="text-2xl font-bold mb-4">{inputs.name}</h2>
				<p className="text-lg mb-2">{inputs.location}</p>
				<p className="text-gray-700 mb-8">{inputs.description}</p>
				<p className="text-gray-700 mb-8">{inputs.price}</p>

				<div className="mb-8">
					<label className="block text-gray-700 mb-2">Select Date:</label>
					<DatePicker
						name='date'
						selected={selectedDate}
						onChange={handleDateChange}
						dateFormat={"yyyy/MM/dd"}
						className="w-48 border border-gray-300 rounded px-4 py-2"
					/>
				</div>

				<div className="mb-8">
					<label className="block text-gray-700 mb-2">Select Time Slot:</label>
					<select
						name='timeSlot'
						value={selectedTimeSlot}
						onChange={e => setSelectedTimeSlot(e.target.value)}
						className="w-48 border border-gray-300 rounded px-4 py-2"
					>
						<option value="">Select a Time Slot</option>
						{inputs.availableSlots?.map((time, index) =>
							<option key={index} value={time}>{time}</option>
						)}
					</select>
				</div>

				<div className="flex flex-row items-center">
					{inputs.images?.map((image, index) => (
						<div key={index} className="mb-4">
							<img
								src={image}
								onClick={() => openImageViewer(index)}
								className="cursor-pointer"
								alt={`Image ${index + 1}`}
								style={{ maxWidth: '200px', height: '150px', margin: "2px" }} // Set max width and height for thumbnail
							/>
						</div>
					))}
				</div>
				{isLogin && <button
					type='submit'
					className='bg-green-700 text-white px-4 py-2 rounded-full mt-8'
				>
					Book
				</button>}
				{!isLogin && <button
					onClick={() => { navigate('/login') }}
					className='bg-green-700 text-white px-4 py-2 rounded-full mt-8'
				>
					Login to book
				</button>}

				{isViewerOpen &&
					<ImageViewer
						src={inputs.images}
						currentIndex={currentImage}
						onClose={closeImageViewer}
					/>
				}
			</form>
		</div>
	)
}

export default GroundDetails;