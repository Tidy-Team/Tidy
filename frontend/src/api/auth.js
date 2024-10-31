import { instance as axios } from './axios';

const signUpRequest = async user => {
  try {
    const response = await axios.post(`/sign-up`, user);
    return response;
  } catch (error) {
    console.error('Error during register request:', error);
    throw error;
  }
};

const signInnRequest = async user => {
  try {
    const response = await axios.post(`/sign-in`, user);
    return response;
  } catch (error) {
    console.error('Error during login request:', error);
    throw error;
  }
};

const logoutRequest = async () => {
  try {
    const response = await axios.post(`/sign-out`);
    return response;
  } catch (error) {
    console.error('Error during logaut request:', error);
    throw error;
  }
};

const verifySession = async () => {
  try {
    const response = await axios.get(`/session`);
    return response;
  } catch (error) {
    console.error('Error during token verification:', error);
    throw error;
  }
};

export { signUpRequest, signInnRequest, verifySession, logoutRequest };
