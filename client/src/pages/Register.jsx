import  { useState } from 'react';
import toast from 'react-hot-toast'
import { publicRequest } from '../helpers/axios';
import { NavLink } from 'react-router-dom';
const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const[errors,setErrors]=useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
  e.preventDefault();
  try {
   await publicRequest.post('/auth/register', formData);
    toast.success('User Registered successfully');
  } catch (err) {
    const inputerror = err.response.data.errors;
    const error = err.response.data.message;

    toast.error(error);
    setErrors(inputerror);
  }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{ background: 'linear-gradient(to bottom, #F3E5AB, #D4B996)' }}>
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 w-full sm:max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Register
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
                                                      {errors?.username&&<p className='text-red-500'>{errors.username}</p>}

          </div>
          <div>
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
                                                      {errors?.email&&<p className='text-red-500'>{errors.email}</p>}

          </div>
          <div>
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
                                                      {errors?.password&&<p className='text-red-500'>{errors.password}</p>}

          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-gray-700 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your password"
              required
            />
                                                                  {errors?.password&&<p className='text-red-500'>{errors.password}</p>}

          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className='mt-4'>
        <NavLink to="/login" className="text-blue-600 hover:underline">
          Already have an account? Login
        </NavLink> 
        </div>
      </div>
    </div>
  );
};

export default Register;
