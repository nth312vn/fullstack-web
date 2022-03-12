import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};
export const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
export const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};
export const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};
export const editUser = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
export default handleLoginApi;
