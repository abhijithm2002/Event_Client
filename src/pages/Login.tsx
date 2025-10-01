import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../service/authService';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../ReduxStore/authSlice';
import { Button } from '@heroui/react';

interface LoginFormValues {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginFormValues) => {
  try {
    const data = await userLogin(values); // userLogin now returns the backend data
    console.log('response from login', data);
    
    toast.success(data.message); // show backend success message
    
    dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
    navigate('/');
  } catch (error: any) {
    console.log('login error', error);
    toast.error(error.message || 'Failed to log in'); // show backend error message
  }
};


  return (

    <section className="min-h-screen w-full relative bg-black flex items-center justify-center">
      <Toaster position="top-center"/>
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 w-full rounded-lg shadow-md p-6 space-y-6 sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            className="w-8 h-8 mr-2"
          />
          <span className="text-2xl font-semibold bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text">
            Event Management
          </span>
        </div>

        {/* Form Header */}
        <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text text-center">
          Sign in to your account
        </h1>

        {/* Form with Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white dark:text-gray-300"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white dark:text-gray-300"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="shadow"
                  color="danger"
                  className="items-center"
                >
                  Sign in
                </Button>
              </div>


              {/* Sign Up Link */}
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link to={"/register"} className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );

};

export default Login;
