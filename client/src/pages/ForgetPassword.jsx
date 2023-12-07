import { useState } from 'react';
import toast from 'react-hot-toast';
import { publicRequest } from '../helpers/axios';

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post('/auth/forgotpassword', formData);
      toast.success('A link has been sent to your email (check inbox folder).');
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
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Forgot Password</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
