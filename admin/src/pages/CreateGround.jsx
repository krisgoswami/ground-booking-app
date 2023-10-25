import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import Switch from 'react-switch';
import toast from 'react-hot-toast';


const CreateGround = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [inputs, setInputs] = useState({
        ground_name: "",
        location: "",
        description: "",
        price: "",
        published: false,
        images: [],
    });

    //handle publish switch change
    const handleSwitchChange = () => {
        setInputs(prevState => ({
            ...prevState,
            published: !prevState.published
        }))
    }

    //handle input change
    const handleInputChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    // const handleFileChange = (e) => {
    //     const files = Array.from(e.target.files);
    //     setInputs({ ...inputs, images: files });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.ground_name || !inputs.description || !inputs.price || !inputs.location) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            if (token) {
                const formData = new FormData(); // Create a FormData object to send files

                // Append other form data fields
                formData.append('ground_name', inputs.ground_name);
                formData.append('description', inputs.description);
                formData.append('price', inputs.price);
                formData.append('location', inputs.location);
                formData.append('published', inputs.published);

                // Append the image files
                // for (let i = 0; i < inputs.images.length; i++) {
                //     formData.append(`images`, inputs.images[i]);
                // }

                // Convert comma-separated URLs to an array of strings
                const imageUrls = inputs.images.split(',').map(url => url.trim());

                // Append the image URLs to the FormData
                imageUrls.forEach((url, index) => {
                    formData.append(`images[${index}]`, url);
                });

                const { data } = await axios.post(`${BASE_URL}/api/v1/admin/create-ground`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json', // Set content type to multipart form data
                    }
                });
                if (data.success) {
                    toast.success("Ground created");
                    // navigate('/all-courses');
                } else {
                    toast.error("Something went wrong");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Create Ground</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Ground Name</label>
                    <input
                        type="text"
                        name="ground_name"
                        value={inputs.ground_name}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={inputs.location}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={inputs.description}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-4 py-2 h-32"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={inputs.price}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Published</label>
                    <Switch
                        onChange={handleSwitchChange}
                        checked={inputs.published}
                        onColor="#6fd26f"
                        onHandleColor="#1ea624"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Images</label>
                    <input
                        type="text"
                        placeholder='Enter links separated by comma'
                        name='images'
                        value={inputs.images}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-700 hover:bg-green-900 text-white py-2 px-4 rounded-full"
                >
                    Create Ground
                </button>
            </form>
        </div>
    )
}

export default CreateGround