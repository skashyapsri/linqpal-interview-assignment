import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import { Offline, Online } from "react-detect-offline";
import { Auth } from "aws-amplify";
import routes from "routes.js";
import NotificationAlert from "react-notification-alert";
import { Container } from "reactstrap";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.loadUser();
        this.state = {
            backgroundColor: "black",
            activeColor: "info",
        };
        this.mainPanel = React.createRef();
    }
    notificationAlert = React.createRef();
    notify(place, color, message) {
        var type;
        switch (color) {
            case 1:
                type = "primary";
                break;
            case 2:
                type = "success";
                break;
            case 3:
                type = "danger";
                break;
            case 4:
                type = "warning";
                break;
            case 5:
                type = "info";
                break;
            default:
                break;
        }
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        <b>{message}</b>
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        };
        this.notificationAlert.current.notificationAlert(options);
    }

    loadUser() {
        Auth.currentAuthenticatedUser()
            .then((user) => {
                
            })
            .catch((err) => this.props.history.push("/login"));
    }
    componentDidUpdate(e) {
        if (e.history.action === "PUSH") {
            this.mainPanel.current.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
        }
    }
    handleActiveClick = (color) => {
        this.setState({ activeColor: color });
    };
    handleBgClick = (color) => {
        this.setState({ backgroundColor: color });
    };
    render() {
        return (
            <>
                <Online>
                    <div className="wrapper">
                        <NotificationAlert ref={this.notificationAlert} />
                        <Sidebar
                            {...this.props}
                            routes={routes}
                            bgColor={this.state.backgroundColor}
                            activeColor={this.state.activeColor}
                        />
                        <div className="main-panel" ref={this.mainPanel}>
                            <Navbar {...this.props} />
                            <Switch>
                                {routes.map((prop, key) => {
                                    return (
                                        <Route
                                            path={prop.layout + prop.path}
                                            component={prop.component}
                                            key={key}
                                        />
                                    );
                                })}
                            </Switch>
                            <Footer fluid />
                        </div>
                    </div>
                </Online>
                <Offline>
                    <Container style={{ textAlign: "justify" }}>
                        <div style={{ textAlign: "center" }}>
                            <img
                                src="https://d2y9gcl41dxj32.cloudfront.net/assets/img/logo.png"
                                alt="weddingvia.com"
                                style={{ width: "15rem", margin: "15px" }}
                            />
                            <h6 style={{ color: "#fff", fontStyle: "italic" }}>
                                You are Offline!
                            </h6>
                        </div>
                        <div style={{ color: "#fff" }}>
                            <p>
                                <i>2020, 2-minute read.</i>
                            </p>
                            <p>
                                Do you want to be productive? Just go offline,
                                because to maintain a constant connection to the
                                internet is to maintain a constant connection to
                                interruptions, both external and internal.
                            </p>
                            <p>
                                The external interruptions are legion and well
                                documented: you have a new message on Gmail,
                                Slack, Twitter, Facebook, Instagram, Snapchat,
                                LinkedIn. Friends, family, coworkers, and
                                spammers: each have direct access to your
                                precious attention.
                            </p>
                            <p>
                                But it’s the internal distractions that are
                                truly pernicious. You can mute Twitter
                                notifications and log off from Slack, but how do
                                you stop your own mind from derailing you?
                            </p>
                            <p>
                                I have spent hours caught in webs of my own
                                curiosity. Most dangerous is the split-second
                                whim: “I wonder what the second most commonly
                                spoken language is?” Those 500 milliseconds
                                could change your day, because it's never just
                                one Google search, never just one Wikipedia
                                article. Disconnecting from the internet
                                short-circuits those whims, allowing you to move
                                on unencumbered.
                            </p>
                            <p>(It’s Spanish, by the way.)</p>
                            <p>
                                This page itself is an experiment in that vein:
                                What if certain content required us to
                                disconnect? What if readers had access to that
                                glorious focus that makes devouring a novel for
                                hours at a time so satisfying? What if creators
                                could pair that with the power of modern
                                devices? Our phones and laptops are amazing
                                platforms for inventive content—if only we could
                                harness our own attention.
                            </p>
                            <p>
                                Offline-only content would also force creators
                                to think differently. Look up; there was not a
                                single link to distract readers. How many good
                                articles have you left half-read because you
                                chased a shiny underlined link? When you are
                                offline, right here is the only place you can
                                be.
                            </p>
                            <p>
                                I can already hear the groans: “But I have to be
                                online for my job.” I don’t care. Make time. I
                                bet the thing that makes you valuable is not
                                your ability to Google something but your
                                ability to synthesize information. Do your
                                research online; create offline.
                            </p>
                            <p>
                                Now back to your regularly scheduled internet.
                                Just remember to give yourself an occasional
                                gift of disconnection.
                            </p>
                            <p>
                                <i
                                    className="fa fa-heart heart"
                                    style={{ color: "#da4453" }}
                                />{" "}
                                Srikrishna S Kashyap
                            </p>
                        </div>
                    </Container>
                </Offline>
            </>
        );
    }
}

export default Dashboard;
