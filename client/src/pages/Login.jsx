import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    // handle input change
    const handleOnChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    //login logic
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.admin._id);
                localStorage.setItem("email", data?.admin.email);
                // dispatch(authActions.login());
                toast.success("Logged in");
                // navigate('/all-courses');
            } else {
                toast.error("Email or password incorrect");
            }
        } catch (error) {
            console.log(error);
            toast.error("Email or password incorrect");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleOnSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={inputs.email}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    );
};


export default Login;