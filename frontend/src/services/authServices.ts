import axios from "axios"
import { LoginCredentials, SignupCredentials, UserType } from "../Models/UserModel"
import { appConfig } from "../utils/appConfig"


export const signinUser = async (data: LoginCredentials) => {
  const tokenData =  await axios.post(appConfig.auth.login, data);
  
  const token = tokenData.data;
  localStorage.setItem('token',`${token}`);
  return token;
}

export const signupUser = async (data: SignupCredentials) => {
  const correctData = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
  }
  return await axios.post(appConfig.auth.signup, correctData);
}

export const getUserInformation = async ():Promise<UserType> => {
    let returnedUser = {} as UserType;
    try {
      const response = await axios.get(appConfig.auth.userInformation, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` 
        }
    });
      returnedUser = response.data;

      if (response.data.role){
        returnedUser.role = "user";
      }
      else{
        returnedUser.role = "admin";
      }
      return returnedUser as UserType;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};