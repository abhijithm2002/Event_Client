import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userSignup } from '../service/authService';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import {Button} from "@heroui/react";

export type UserRole = "attendee" | "organizer";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}
const Register = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee' as const
  };

  const handleSubmit = async(values :RegisterFormValues) => {
    console.log('Form Data:', values);
    try {
      const response = await userSignup(values);
      console.log(response.data.message,'message')
      if(response.status == 201) {
        toast.success('User registered Successfully')
        navigate('/login')
      } else if (response.status === 400 && response.data.message === 'Email already exists') {
        toast.error('Email already exists');
      } 
      else {
        toast.error('Failed to register user')
      }
    } catch (error) {
      toast.error('Failed to register user')
    }
  };

  return (
    <>
      <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      {/* Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255, 80, 120, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative w-full rounded-lg shadow-md p-6 space-y-6 sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
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
        <h1 className="text-2xl font-bold bg-gradient-to-l from-indigo-500 via-red-500 to-indigo-500 text-transparent bg-clip-text  text-center">
          Register Here
        </h1>
        {/* Form with Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-small text-white dark:text-gray-300"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Alex"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-white  focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-small text-white dark:text-gray-300"
                >
                  Your Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-white  focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-small text-white dark:text-gray-300"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-white  focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-small text-white dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-white  focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-small text-white dark:text-gray-300"
                >
                  Role
                </label>
                <Field
                  as="select"
                  id="role"
                  name="role"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-white  focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="attendee">Attendee</option>
                  <option value="organizer">Organizer</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                color='danger'
                variant='shadow'
              >
                Sign Up 
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      </div>
      
      </>
  );
};

export default Register;
