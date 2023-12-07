import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { publicRequest } from '../helpers/axios';

const ResetPassword = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    token: '',
    user: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState('');

 useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    setFormData((prevData) => ({ ...prevData, token, user }));
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user, newPassword, confirmPassword } = formData;
      await publicRequest.post(`/auth/reset-password/${token}/${user}`, { newPassword, confirmPassword });
      toast.success('Password reset successful. You can now log in with your new password.');
      navigate('/login');
    } catch (err) {
      const inputerror = err.response.data.errors;
      const error = err.response.data.message;
      toast.error(error);
      setErrors(inputerror);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-10 w-full sm:max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Reset Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword" className="text-gray-700 font-semibold block">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your new password"
              required
            />
            {errors?.newPassword && <p className="text-red-500 mt-1">{errors.newPassword}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="text-gray-700 font-semibold block">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Confirm your new password"
              required
            />
            {errors?.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
