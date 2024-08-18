import axios from "axios";

const axiosURL = axios.create({
  baseURL: "",
});
const useAxios = () => {
  return axiosURL;
};

export default useAxios;
