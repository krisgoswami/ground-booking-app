import React from 'react'

const Footer = () => {
	return (
		<div>
			<div className='flex justify-between bg-gray-900 h-60'>
				<div className='ml-12 mt-5'>
					<p className='text-white text-2xl font-bold mb-5'>Book-A-Ground.com</p>
					<p className='text-white mb-5 w-96 text-justify'>Book-A-Ground.com is an app where you can book grounds to play football and cricket with your friends and loved ones. Book a ground near you today! </p>
				</div>
				<div className='mx-5 ml-32 mt-5'>
					<p className='text-white text-lg font-bold mb-5'>Contact</p>
					<p className='text-white'>Email: <span className='text-blue-200 hover:text-blue-400 cursor-pointer'>JohnDoe@xyz.com</span></p>
				</div>
				<div className='mx-5 mr-36 mt-5'>
					<p className='text-white text-lg font-bold mb-5'>Links</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>FAQs</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>Facebook</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>Instagram</p>
					<p className='text-blue-200 hover:text-blue-400 cursor-pointer mb-2'>LinkedIn</p>
				</div>
			</div>

			<div className='bg-gray-950 py-4 flex justify-between border-t border-gray-400'>
				<p className='text-white mx-2 ml-10 font-semibold'> &#169; Apollo: TheDev</p>
				<div className='flex gap-5'>
					<a href='#' className='mx-2 text-white font-medium'>Privacy Policy</a>
					<a href='#' className='mx-2 text-white font-medium'>Terms</a>
					<a href='#' className='mx-2 mr-10 text-white font-medium'>Legal</a>
				</div>
			</div>
		</div>
	)
}

export default Footer;