import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import ImageViewer from 'react-simple-image-viewer';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';

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

	//logic to get ground details
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
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getGroundDetails();
	}, []);

	//handle datechange to disable current day timeslot
	const handleDateChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedDate(new Date(selectedValue));
	};
	const handleTimeSlotChange = (event) => {
		const selectedValue = event.target.value;
		setSelectedTimeSlot(selectedValue);
	};
	const isCurrentDate = selectedDate.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];

	//logic to book ground
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
		<div className="bg-gray-200 h-screen overflow-y-auto p-8">
			<form onSubmit={bookGround}>
				<div className="relative h-96">
					<img src={inputs.images[0]} className="object-cover w-full h-full"></img>
					<div className="absolute inset-0 bg-black opacity-70 z-20"></div>
					<div className="absolute inset-0 flex items-center justify-center z-30">
						<h1 className="text-white text-4xl font-bold">{inputs.name}</h1>
					</div>
				</div>
				<h2 className="text-2xl font-bold mb-4">{inputs.name}</h2>
				<p className="text-lg mb-2">{inputs.location}</p>
				<p className="text-gray-700 mb-8">{inputs.description}</p>
				<p className="text-gray-700 mb-8">{inputs.price}</p>

				<div className="mb-8">
					<label className="block text-gray-700 mb-2">Select Date:</label>
					<input
						type="date"
						value={selectedDate.toISOString().split('T')[0]}
						onChange={handleDateChange}
						className='rounded p-2 border border-gray-300'
					/>
				</div>

				<div className="mb-8">
					<label className="block text-gray-700 mb-2">Select Time Slot:</label>
					<select
						name='timeSlot'
						value={selectedTimeSlot}
						// onChange={e => setSelectedTimeSlot(e.target.value)}
						onChange={handleTimeSlotChange}
						className="w-42 border border-gray-300 rounded p-2"
						disabled={isCurrentDate}
					>
						<option value="">Select a Time Slot</option>
						{inputs.availableSlots?.map((time, index) =>
							<option key={index} value={time}>{time}</option>
						)}
					</select>
					{isCurrentDate ? <span className='text-red-500 ml-3'>No slots available for selected date</span> : ""}
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
					className='bg-gray-900 text-white px-4 py-2 rounded-lg mt-8'
				>
					Book
				</button>}
				{!isLogin && <button
					onClick={() => { navigate('/login') }}
					className='bg-gray-900 text-white px-4 py-2 rounded-lg mt-8'
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