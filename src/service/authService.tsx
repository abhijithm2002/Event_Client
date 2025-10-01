import authInstance from "../api/axiosInstance";

export interface IUserSignup {
  name: string;
  email: string;
  password: string;
  role : string
}

export interface IUserLogin {
  email: string;
  password: string;
}

export const userSignup = async (userData: IUserSignup) => {
  console.log('sign up', userData)
  const response = await authInstance.post(`/api/user/userSignup`, userData);
  return response;
};

export const userLogin = async (userData: IUserLogin) => {
  try {
    const response = await authInstance.post(`/api/user/userLogin`, userData);
    console.log('response from login', response.data);
    return response.data;  // return the actual data
  } catch (error: any) {
    console.log('error response from login', error.response?.data);
    // Forward the error message
    throw error.response?.data || { message: "An error occurred" };
  }
};



// interface IAuthResponse {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   accessToken: string;
// }

// export const userLogin = async (userData: IUserLogin): Promise<IAuthResponse> => {
//   const { data } = await authInstance.post<IAuthResponse>(`/api/user/userLogin`, userData);
//   return data;
// };
