import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

function PrivateRoute({ component: Component, ...rest }) {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    React.useEffect(() => {
        async function isAuth() {
            const user = await Auth.currentSession();
            if (user.getIdToken().getJwtToken()) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        isAuth();
    }, []);
    return (
        <Route
            {...rest}
            render={(props) =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;
