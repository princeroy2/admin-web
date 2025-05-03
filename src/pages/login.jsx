import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // State for form data and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backendError, setBackendError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // useNavigate from React Router

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    setEmailError('');
    setPasswordError('');
    setBackendError('');

    let isFormValid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isFormValid = false;
    }

    if (!password) {
      setPasswordError('Password cannot be empty');
      isFormValid = false;
    }

    if (isFormValid) {
      try {
        setLoading(true);

        const response = await fetch('http://192.168.1.7:1234/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log(result);

        if (response.ok) {
          if (result.statuscode !== 400) {
            // Check if the user's role is 'admin'
            if (result.user.role === 'ADMIN') {
              // Store the accessToken in localStorage (or AsyncStorage for React Native)
              try {
                localStorage.setItem('accessToken', result.accessToken);
                localStorage.setItem('login', 'true'); // For React web
                console.log('Token saved');
                console.log(result.accessToken);

                // Store user ID and role for future use if needed
                localStorage.setItem('userId', result.user._id);
                localStorage.setItem('userRole', result.user.role);

                // Navigate to the home screen after successful login
                navigate('/'); // Using React Router's navigate function
              } catch (error) {
                console.error('Error saving token:', error);
              }
            } else {
              // If user is not admin, show an error message
              setBackendError('You are not authorized to log in.');
            }
          } else {
            setBackendError(result.message);
          }
        } else {
          setBackendError('API error: ' + result.message);
        }
      } catch (error) {
        setBackendError('Network error: ' + error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
              {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            </div>
          </div>

          {/* Password input */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <div className="text-sm">
                <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
          </div>

          {/* Error message display */}
          {backendError && (
            <div className="text-sm text-red-500">
              {backendError}
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
