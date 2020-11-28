import axios from "axios";
const API_URL = "https://tkrwmw72yl.execute-api.ap-south-1.amazonaws.com/prod/";

export const Register = async (token) => {
    const res = await axios.post(`${API_URL}`, { token });
    return res.data;
};
