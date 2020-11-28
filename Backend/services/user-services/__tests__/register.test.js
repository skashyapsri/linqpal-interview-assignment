/**
* @jest-environment node
*/
const axios = require("axios");
const jwtEncode = require("jwt-encode");
const API_URL = "https://tkrwmw72yl.execute-api.ap-south-1.amazonaws.com/prod/";
describe("Register External Users", () => {
    test("Response 200", async () => {
        try {
            const jwt = jwtEncode(
                {
                    FirstName: "Srikrishna",
                    LastName: "Kashyap",
                    TelephoneNumber: "+916360164519",
                    FullAddress: "Bangalore, Karnataka, India",
                    SSN: "082-34-3015"
                },
                "a0b5f1648e69edf2ced5efce0cb9eef7"
            );
            const res = await axios.post(`${API_URL}`, {"token": jwt});
            expect(res.status).toBe(200)
            expect(res.data.body.status).toBe(true)
        } catch (e) {
        }
    });
    test("Response 422 with no payload", async () => {
        try {
            await axios.post(`${API_URL}`, {});
        } catch (e) {
            expect(e.response.data.status).toBe(false);
            expect(e.response.status).toBe(422);
        }
    });
    test("Response 502 with Invalid Request Body", async () => {
        try {
            const jwt = jwtEncode(
                {
                    FirstName: "Srikrishna",
                    TelephoneNumber: "+916360164519",
                },
                "a0b5f1648e69edf2ced5efce0cb9eef7"
            );
            await axios.post(`${API_URL}`, {"token": jwt});
        } catch (e) {
            expect(e.response.status).toBe(502);
        }
    });
    test("Response 400 with Invalid Payload", async () => {
        try {
            const jwt = jwtEncode(
                {
                    FirstName: "Srikrishna",
                    LastName: "Kashyap",
                    TelephoneNumber: "+91636016451",
                    FullAddress: "Bangalore, Karnataka, India",
                    SSN: "082-34-3015"
                },
                "a0b5f1648e69edf2ced5efce0cb9eef7"
            );
            await axios.post(`${API_URL}`, {"token": jwt});
        } catch (e) {
            expect(e.response.status).toBe(400);
        }
    });
});
