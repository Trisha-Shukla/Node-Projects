import axios from "axios";
const instance = axios.create({
  baseURL: "https://geekecom.onrender.com/api",
  withCredentials: true,
});
export default instance;