import axios from "axios";
import { Auth } from "aws-amplify";
import jwtDecode from "jwt-decode";
const API_URL = "https://cbxi0sp3f3.execute-api.ap-south-1.amazonaws.com/dev/";

export const GetRegisteredUsers = async () => {
    const user = await Auth.currentSession();
    const payload = {
        username: user.getAccessToken().payload.username,
    };
    const res = await axios.post(`${API_URL}`, payload, {
        headers: {
            Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
        },
    });
    if (res.data.statusCode === 200) {
        const body = JSON.parse(res.data.body);
        if (body.status) {
            const data = jwtDecode(body.data);
            return { status: true, data };
        }
    }
    else    {
        return { status: false }
    }
};
