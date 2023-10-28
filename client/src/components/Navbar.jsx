
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
					<div className="text-white font-bold text-xl cursor-pointer" onClick={() => { navigate('/') }}>Book-A-Ground</div>
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
					<div className="lg:flex items-center justify-between text-lg gap-4">
						{!isLogin && <>
							<p className="text-white font-medium cursor-pointer" onClick={() => {
								navigate('/');
							}}>Home</p>
							<a href="#" className="text-black">About</a>
							<a href="#" className="text-black">Contact</a>
						</>}

						{isLogin && <>
							<p className="text-white font-medium cursor-pointer" onClick={() => {
								navigate('/');
							}}>Home</p>
							<p className="text-white font-medium cursor-pointer" onClick={() => {
								navigate('/grounds');
							}}>Grounds</p>
						</>}

					</div>
					<div className='flex items-center'>
						{!isLogin &&
							<button className="bg-white text-black font-bold px-4 py-2 rounded-md" onClick={handleLogin}>Login</button>
						}
						{isLogin &&
							<div className="mx-auto flex items-center justify-center bg-black rounded-md">
								<div className="group relative cursor-pointer">

									<div className="flex items-center justify-between space-x-5 bg-white px-2 rounded-sm">
										<a className="menu-hover py-2 text-base font-medium text-black lg:mx-4" onClick="">
											Hi, {user}!
										</a>
										<span>
											<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
												stroke="currentColor" className="h-6 w-6">
												<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
											</svg>
										</span>
									</div>

									<div
										className="invisible absolute z-50 flex w-full flex-col rounded-sm bg-gray-300 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">

										<a className="my-2 block border-b border-black py-1 font-semibold text-gray-600 hover:text-gray-950 md:mx-2" onClick={() => { navigate('/bookings') }}>
											Bookings
										</a>

										<a class="my-2 block border-b border-black py-1 font-semibold text-gray-600 hover:text-gray-950 md:mx-2" onClick={handleLogout}>
											Logout
										</a>
									</div>
								</div>
							</div>
						}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
