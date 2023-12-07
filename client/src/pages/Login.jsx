import  { useState } from 'react';
import toast from 'react-hot-toast';
import { publicRequest } from '../helpers/axios';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post('/auth/login', formData);
      toast.success('User Logged in successfully');
    } catch (err) {
      const inputerror = err.response.data.errors;
      const error = err.response.data.message;

      toast.error(error);
      setErrors(inputerror);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #F3E5AB, #D4B996)' }}>
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 w-full sm:max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-gray-700 font-semibold block">
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
            {errors?.email && <p className="text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="text-gray-700 font-semibold block">
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
            {errors?.password && <p className="text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div className="flex justify-between">
            <NavLink to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot Password?
            </NavLink>
            <button
              type="submit"
              className="w-32 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4">
          <NavLink to="/register" className="text-blue-600 hover:underline">
            Don{"'"}t have an account? Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
