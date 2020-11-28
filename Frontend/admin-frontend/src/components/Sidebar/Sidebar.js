import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.activeRoute.bind(this);
        this.sidebar = React.createRef();
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1
            ? "active"
            : "";
    }
    render() {
        return (
            <div
                className="sidebar"
                data-color={this.props.bgColor}
                data-active-color={this.props.activeColor}
            >
                <div className="logo" style={{ textAlign: "center" }}>
                    <a href="https://linqpal.com" className="simple-text logo-normal">
                        <img
                            src={require("assets/img/logo.svg")}
                            alt="react-logo"
                        />
                    </a>
                </div>
                <div className="sidebar-wrapper" ref={this.sidebar}>
                    <Nav>
                        {this.props.routes.map((prop, key) => {
                            return (
                                <li
                                    className={
                                        this.activeRoute(prop.path) +
                                        (prop.pro ? " active-pro" : "")
                                    }
                                    key={key}
                                >
                                    <NavLink
                                        to={prop.layout + prop.path}
                                        className="nav-link"
                                        activeClassName="active"
                                    >
                                        <i className={prop.icon} style={{ color: "white" }} />
                                        <p style={{ color: "white" }}>{prop.name}</p>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </Nav>
                </div>
            </div>
        );
    }
}

export default Sidebar;
