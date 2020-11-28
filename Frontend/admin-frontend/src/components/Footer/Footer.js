import React from "react";
import { Container, Row, Col } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";
import { Cache } from "aws-amplify";
const publicIp = require("public-ip");

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: "127.0.0.1",
            sessionId: "",
            lastLogin: "",
        };
        publicIp.v4().then((ip) => {
            this.setState({
                ip,
            });
        });
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                sessionId: Cache.getItem("sessionId"),
                lastLogin:
                    Cache.getItem("lastLogin") === "Best Wishes from WeddingVia"
                        ? Cache.getItem("lastLogin")
                        : new Date(Cache.getItem("lastLogin")).toDateString() +
                          ", " +
                          new Date(
                              Cache.getItem("lastLogin")
                          ).toLocaleTimeString(),
            });
        }, 2000);
    }
    render() {
        const { ip } = this.state;
        return (
            <footer
                className={
                    "footer" + (this.props.default ? " footer-default" : "")
                }
            >
                <Container>
                    <Row>
                        <Col md="3" xs="12">
                            <div className="copyright">Current IP: {ip}</div>
                        </Col>
                        <div className="credits ml-auto">
                            <div className="copyright">
                                &copy; {1900 + new Date().getYear()}, made with{" "}
                                <i
                                    className="fa fa-heart heart"
                                    style={{ color: "#da4453" }}
                                />{" "}
                                by Srikrishna S Kashyap
                            </div>
                        </div>
                    </Row>
                </Container>
            </footer>
        );
    }
}

Footer.propTypes = {
    default: PropTypes.bool,
    fluid: PropTypes.bool,
};

export default Footer;
