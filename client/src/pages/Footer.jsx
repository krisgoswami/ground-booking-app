import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='flex bg-green-900 h-60'>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div className='bg-green-950 py-4 flex justify-between border-t'>
                <p className='text-white mx-2 ml-10 font-semibold'> &#169; Apollo: TheDev</p>
                <div className='flex gap-5'>
                    <a href='#' className='mx-2 text-white font-medium'>Privacy Policy</a>
                    <a href='#' className='mx-2 text-white font-medium'>Terms</a>
                    <a href='#' className='mx-2 mr-10 text-white font-medium'>Legal</a>
                </div>
            </div>
        </>
    )
}

export default Footer;