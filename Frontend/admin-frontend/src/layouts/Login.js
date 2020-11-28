import React from "react";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Auth, Hub } from "aws-amplify";
import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";
import "./amplify.css";

class Login extends React.Component {
    constructor(props) {
        I18n.putVocabulariesForLanguage("en-US", {
            [Translations.SIGN_IN_HEADER_TEXT]: "Welcome to Linqpal - Admin",
        });
        super(props);
        Hub.listen("auth", this, "navigator");
        this.state = {
            backgroundColor: "white",
            activeColor: "info",
            user: null,
        };
        this.mainPanel = React.createRef();
    }
    componentDidMount() {
        this.loadUser();
    }
    loadUser() {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                this.setState({ user: user });
                this.props.history.push("/admin/dashboard");
            })
            .catch((err) => this.setState({ user: null }));
    }
    handleActiveClick = (color) => {
        this.setState({ activeColor: color });
    };
    handleBgClick = (color) => {
        this.setState({ backgroundColor: color });
    };
    onHubCapsule(capsule) {
        this.loadUser();
    }
    render() {
        return (
            <div
                className="container"
                style={{
                    margin: " 0 auto",
                    textAlign: "center",
                    transform: "translateY(10%)",
                }}
            >
                <img
                    src={require("assets/img/logo-dark.svg")}
                    alt="linqpal"
                />
                <AmplifyAuthenticator style={{ background: "#212121" }}>
                    <h1>Loading...</h1>
                </AmplifyAuthenticator>
            </div>
        );
    }
}

export default Login;
