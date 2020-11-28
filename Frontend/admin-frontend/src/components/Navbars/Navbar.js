import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container,
} from "reactstrap";
import { Auth } from "aws-amplify";
import routes from "routes.js";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            color: "transparent",
            username: "",
        };

        Auth.currentUserInfo()
            .then((user) => {
                this.setState({
                    username: user.username,
                });
            })
            .catch((err) => {
                console.log(err);
            });
        this.toggle = this.toggle.bind(this);
        this.dropdownToggle = this.dropdownToggle.bind(this);
        this.sidebarToggle = React.createRef();
    }
    toggle() {
        if (this.state.isOpen) {
            this.setState({
                color: "transparent",
            });
        } else {
            this.setState({
                color: "dark",
            });
        }
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    dropdownToggle(e) {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    getBrand() {
        let brandName = "";
        routes.map((prop, key) => {
            if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
                if (prop.name === "Users") {
                    brandName = "Welcome " + this.state.username;
                } else {
                    brandName = prop.name;
                }
            }
            return null;
        });
        return brandName;
    }
    openSidebar() {
        document.documentElement.classList.toggle("nav-open");
        this.sidebarToggle.current.classList.toggle("toggled");
    }
    // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
    updateColor() {
        if (window.innerWidth < 993 && this.state.isOpen) {
            this.setState({
                color: "dark",
            });
        } else {
            this.setState({
                color: "transparent",
            });
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateColor.bind(this));
    }
    componentDidUpdate(e) {
        if (
            window.innerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
            this.sidebarToggle.current.classList.toggle("toggled");
        }
    }
    signOut = async () => {
        Auth.signOut()
            .then((data) => this.props.history.push("/login"))
            .catch((err) => console.log(err));
    };
    render() {
        return (
            // add or remove classes depending if we are on full-screen-maps page or not
            <Navbar
                color={
                    this.props.location.pathname.indexOf("full-screen-maps") !==
                    -1
                        ? "dark"
                        : this.state.color
                }
                expand="lg"
                className={
                    this.props.location.pathname.indexOf("full-screen-maps") !==
                    -1
                        ? "navbar-absolute fixed-top"
                        : "navbar-absolute fixed-top " +
                          (this.state.color === "transparent"
                              ? "navbar-transparent "
                              : "")
                }
            >
                <Container fluid>
                    <div className="navbar-wrapper">
                        <div className="navbar-toggle">
                            <button
                                type="button"
                                ref={this.sidebarToggle}
                                className="navbar-toggler"
                                onClick={() => this.openSidebar()}
                            >
                                <span className="navbar-toggler-bar bar1" />
                                <span className="navbar-toggler-bar bar2" />
                                <span className="navbar-toggler-bar bar3" />
                            </button>
                        </div>
                        <NavbarBrand>{this.getBrand()}</NavbarBrand>
                    </div>
                    <NavbarToggler onClick={this.toggle}>
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                        <span className="navbar-toggler-bar navbar-kebab" />
                    </NavbarToggler>
                    <Collapse
                        isOpen={this.state.isOpen}
                        navbar
                        className="justify-content-end"
                    >
                        <Nav navbar>
                            <Dropdown
                                nav
                                isOpen={this.state.dropdownOpen}
                                toggle={(e) => this.dropdownToggle(e)}
                            >
                                <DropdownToggle caret nav>
                                    <i className="nc-icon nc-settings-gear-65" />
                                    <p>
                                        <span className="d-lg-none d-md-block">
                                            Settings
                                        </span>
                                    </p>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem
                                        tag="a"
                                        onClick={this.signOut.bind(this)}
                                    >
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default Header;
