import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";

import AdminLayout from "layouts/Admin.js";
import LoginLayout from "layouts/Login.js";
import { configureAmplify } from "./amplify.config";

const hist = createBrowserHistory();
configureAmplify();
ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route
                path="/login"
                render={(props) => <LoginLayout {...props} />}
            />
            <Route
                path="/admin"
                render={(props) => <AdminLayout {...props} />}
            />
            <Redirect to="/login" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
