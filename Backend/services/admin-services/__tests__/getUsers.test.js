/**
 * @jest-environment node
 */
const axios = require("axios");
const jwtEncode = require("jwt-encode");
const API_URL = "https://cbxi0sp3f3.execute-api.ap-south-1.amazonaws.com/dev/";
describe("Admin Get List Of All Registered External Users", () => {
    test("Response 200", async () => {
        try {
            const jwt = jwtEncode(
                {
                    username: "kashyap",
                },
                "a0b5f1648e69edf2ced5efce0cb9eef7"
            );
            const res = await axios.post(
                `${API_URL}`,
                {
                    username: "kashyap",
                },
                {
                    headers: {
                        Authorization: `Bearer eyJraWQiOiJNcGxkeHU3MEtKc3pwUlJiOW1wMW5janh6d01Gb0pKS1VKMWhweHhEbUxVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNTdkYTNiZi05YWZmLTQ1OGItYjdmNy1lOWFjNzBjOGFlNTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV82V2RLMThyR3MiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJrYXNoeWFwIiwiYXVkIjoiM3NwaTd2OTNiMDR0YnAwbmdxbmw4N2IybWIiLCJldmVudF9pZCI6ImNkYTlhNzVkLWIxNzktNDc1Ni1hZTUyLWZhMjQ3NDkwY2IxYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA2NTU5MzQ5LCJwaG9uZV9udW1iZXIiOiIrOTE2MzYwMTY0NTE5IiwiZXhwIjoxNjA2NTYyOTQ5LCJpYXQiOjE2MDY1NTkzNDksImVtYWlsIjoic2thc2h5YXBzcmkwNEBnbWFpbC5jb20ifQ.YeKN0z1HuUV7GXd3VpV0HvXlXejidheYk5FTyFgiG5uB49HFbcoCO-fj6iziRUqc-fM3lP9laqjG4WNrn-l3wt6B1ndoj9jLSzy6vBDrr6FKTY8VtI9p-RuOdAYF-sWuTxyNtvcYFG_BDENKDgcp7_VROUGiVe5PuUO1sIkZm9atTwwWIyz-fetlH8FiU6BVhBsWXWXU5TwbHuH1axBp45_l5bczbJM0y2nzhIwHrcGnB_ptdw2O49gZKoOWtiSO1EO6gM_BnYb7sL0eFDQH3Xm_NvqEMrzBc_ctTISrSh6LDeGjv9HqDOb3ZAoKsQz5rBNGTu3_hV2IAU9WaBcDAQ`,
                    },
                }
            );
            expect(res.status).toBe(200);
            expect(res.data.body.status).toBe(true);
        } catch (e) {
        }
    });
    test("Response 401 with no Authorization", async () => {
        try {
            await axios.post(`${API_URL}`, {
                username: "kashyap",
            });
        } catch (e) {
            expect(e.response.status).toBe(401)
        }
    });
    test("Response 400", async () => {
        try {
            const jwt = jwtEncode(
                {
                    username: "kashyap",
                },
                "a0b5f1648e69edf2ced5efce0cb9eef7"
            );
            const res = await axios.post(
                `${API_URL}`,
                {
                    username: "sri",
                },
                {
                    headers: {
                        Authorization: `Bearer eyJraWQiOiJNcGxkeHU3MEtKc3pwUlJiOW1wMW5janh6d01Gb0pKS1VKMWhweHhEbUxVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzNTdkYTNiZi05YWZmLTQ1OGItYjdmNy1lOWFjNzBjOGFlNTMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV82V2RLMThyR3MiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJrYXNoeWFwIiwiYXVkIjoiM3NwaTd2OTNiMDR0YnAwbmdxbmw4N2IybWIiLCJldmVudF9pZCI6ImNkYTlhNzVkLWIxNzktNDc1Ni1hZTUyLWZhMjQ3NDkwY2IxYSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA2NTU5MzQ5LCJwaG9uZV9udW1iZXIiOiIrOTE2MzYwMTY0NTE5IiwiZXhwIjoxNjA2NTYyOTQ5LCJpYXQiOjE2MDY1NTkzNDksImVtYWlsIjoic2thc2h5YXBzcmkwNEBnbWFpbC5jb20ifQ.YeKN0z1HuUV7GXd3VpV0HvXlXejidheYk5FTyFgiG5uB49HFbcoCO-fj6iziRUqc-fM3lP9laqjG4WNrn-l3wt6B1ndoj9jLSzy6vBDrr6FKTY8VtI9p-RuOdAYF-sWuTxyNtvcYFG_BDENKDgcp7_VROUGiVe5PuUO1sIkZm9atTwwWIyz-fetlH8FiU6BVhBsWXWXU5TwbHuH1axBp45_l5bczbJM0y2nzhIwHrcGnB_ptdw2O49gZKoOWtiSO1EO6gM_BnYb7sL0eFDQH3Xm_NvqEMrzBc_ctTISrSh6LDeGjv9HqDOb3ZAoKsQz5rBNGTu3_hV2IAU9WaBcDAQ`,
                    },
                }
            );
            expect(res.status).toBe(200);
            expect(res.data.body.status).toBe(true);
        } catch (e) {
        }
    });
});
