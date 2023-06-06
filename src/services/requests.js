import axios from "axios";

const baseURL = "http://localhost:5000"; // Update the base URL according to your needs

// Reusable function for making GET requests
export const get = async (endpoint, config = {}) => {
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Reusable function for making POST requests
export const post = async (endpoint, data = {}, config = {}) => {
  try {
    const response = await axios.post(`${baseURL}/${endpoint}`, data, config);
    console.log(response.data, "response");
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Reusable function for making PUT requests
export const put = async (endpoint, data = {}, config = {}) => {
  try {
    const response = await axios.put(`${baseURL}/${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Reusable function for making DELETE requests
export const remove = async (endpoint, config = {}) => {
  try {
    const response = await axios.delete(`${baseURL}/${endpoint}`, config);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

// Handle request errors (you can customize this according to your needs)
const handleRequestError = (error) => {
  console.error("Request error:", error);
  // You can add custom error handling here, such as displaying a notification or redirecting the user
};
