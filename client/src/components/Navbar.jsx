
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Navbar = () => {

	//global state
	let isLogin = useSelector((state) => state.isLogin);
	isLogin = isLogin || localStorage.getItem('userId');

	let user = localStorage.getItem("username");

	const [isOpen, setIsOpen] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogin = () => {
		navigate('/login');
	}

	//handle logout
	const handleLogout = () => {
		try {
			dispatch(authActions.logout());
			localStorage.clear();
			toast("You've been logged out", {
				icon: '⚠️',
			});
			navigate('/login');
		} catch (error) {
			console.log(error);
		}
	}

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className=" bg-green-700 p-4">
			<div className="container mx-auto">
				<div className="flex justify-between items-center">
					<div className="text-white font-bold text-xl">Ground Booking App</div>
					<div className="block lg:hidden">
						<button
							onClick={toggleMenu}
							className="text-white focus:outline-none"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16m-7 6h7"
								/>
							</svg>
						</button>
					</div>
					<div className={`lg:flex ${isOpen ? 'block' : 'hidden'}`}>
						<div className="lg:flex items-center justify-between text-lg gap-4">
							<p className="text-black cursor-pointer" onClick={() => {
								navigate('/');
							}}>Home</p>
							<a href="#" className="text-black">About</a>
							<a href="#" className="text-black">Contact</a>
						</div>
					</div>
					<div className='flex items-center'>
						{!isLogin &&
							<button className="bg-orange-600 text-white font-bold ml-10 px-4 py-1 rounded-full" onClick={handleLogin}>Login</button>
						}
						{isLogin &&
							<>
								<p className='text-white font-semibold mr-4'>Hi, {user}</p>
								<button className="bg-orange-600 text-white font-bold px-4 py-2 rounded-full" onClick={handleLogout}>Logout</button>
							</>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
