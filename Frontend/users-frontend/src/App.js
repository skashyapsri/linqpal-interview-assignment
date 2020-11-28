import React, { Component } from "react";
import sign from "jwt-encode";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import "google-libphonenumber";
import "./assets/css/App.css";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import Select from "react-select";
import CallingCodes from "./CallingCodes";
import { Register } from "./API/API";
var re = /^(?!000|666)[0-8][0-9]{2}-(?!00)[0-9]{2}-(?!0000)[0-9]{4}$/;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            FirstName: "",
            LastName: "",
            TelephoneNumber: "",
            FullAddress: "",
            SSN: "",
            Country: "+1",
            Number: "",
            Message: "",
            SSNMsg: "",
            Loading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSelect2 = this.onSelect2.bind(this);
        this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    }
    hashPayload = () => {
        const jwt = sign(
            {
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,
                TelephoneNumber: this.state.TelephoneNumber,
                FullAddress: this.state.FullAddress,
                SSN: this.state.SSN,
            },
            "a0b5f1648e69edf2ced5efce0cb9eef7"
        );
        return jwt;
    };
    onCountryCodeChange(input, CountryCode) {
        this.setState({
            [input]: CountryCode,
        });
    }
    onChangeNum(event) {
        this.setState({
            Number: event.target.value,
        });
        this.validatePhoneNumber(
            "+" + this.state.Country + " " + event.target.value
        );
    }
    onSelect2(cntrObj) {
        this.setState({
            Country: cntrObj.value,
        });
        this.validatePhoneNumber("+" + cntrObj.value + " " + this.state.Number);
    }
    validatePhoneNumber(phoneNumber) {
        /*
      Phone Number validation using google-libphonenumber
      */
        let valid = false;
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            valid = phoneUtil.isValidNumber(phoneUtil.parse(phoneNumber));
        } catch (e) {
            valid = false;
        }
        if (valid) {
            this.setState({
                Message:
                    "Telephone Number " +
                    this.getValidNumber(phoneNumber) +
                    " is valid",
                color: "green",
                TelephoneNumber: this.getValidNumber(phoneNumber),
            });
        } else {
            this.setState({
                Message: "Telephone Number " + phoneNumber + " is not valid",
                color: "red",
            });
        }
    }
    getValidNumber(phoneNumber) {
        const phoneUtil = PhoneNumberUtil.getInstance();
        const parsedNumber = phoneUtil.parse(phoneNumber);
        return phoneUtil.format(parsedNumber, PhoneNumberFormat.INTERNATIONAL);
    }
    validation = () => {
        const {
            FirstName,
            LastName,
            TelephoneNumber,
            FullAddress,
            SSN,
        } = this.state;
        if (
            FirstName.length <= 0 ||
            LastName.length <= 0 ||
            FullAddress.length <= 0 ||
            TelephoneNumber.length <= 0
        ) {
            toaster.notify(
                <span className="text-red">Please fill all the fields</span>,
                {
                    position: "top-right",
                    duration: 3000,
                }
            );
            return false;
        }
        if (!re.test(SSN)) {
            toaster.notify(
                <span className="text-red">Enter a valid SSN</span>,
                {
                    position: "top-right",
                    duration: 3000,
                }
            );
            return false;
        }
        return true;
    };
    onSubmit = async () => {
        const { Loading } = this.state;
        if (!Loading) {
            this.setState({
                Loading: true,
            });
            if (this.validation()) {
                const res = await Register(this.hashPayload());
                if (res.status) {
                    toaster.notify(
                        <span className="text-green">Success</span>,
                        {
                            position: "top-right",
                            duration: 3000,
                        }
                    );
                    this.setState({
                        Loading: false,
                    });
                } else {
                    toaster.notify(<span className="text-red">Failure</span>, {
                        position: "top-right",
                        duration: 3000,
                    });
                    this.setState({
                        Loading: false,
                    });
                }
            } else {
                this.setState({
                    Loading: false,
                });
            }
        }
    };
    onKeyDown = (e) => {
        if (e.keyCode === 8 && (this.state.SSN.length === 4|| this.state.SSN.length === 7)) {
            this.setState({
                SSN: this.state.SSN.slice(0, this.state.SSN.length - 1),
            });
        }
    };
    onChange(event) {
        const { type, name, value } = event.target;
        if (name === "SSN") {
            if (value.length === 3) {
                this.setState({
                    SSN: value + "-",
                });
            } else if (value.length === 6) {
                this.setState({
                    SSN: value + "-",
                });
            } else {
                this.setState({
                    SSN: value,
                });
            }
            if (!re.test(value)) {
                this.setState({
                    SSNMsg: "Invalid SSN",
                    SSNColor: "red",
                });
            } else {
                this.setState({
                    SSNMsg: "Valid SSN",
                    SSNColor: "green",
                });
            }
        } else {
            this.setState({
                [name]: type === "checkbox" ? !this.state[name] : value,
            });
        }
    }
    render() {
        const { Country, Loading } = this.state;
        return (
            <div className="App" style={{ textAlign: "center" }}>
                <img
                    src="assets/img/logo-dark.svg"
                    style={{ marginBottom: "1rem" }}
                    alt="logo"
                />
                <div className="card-form">
                    <form className="signup">
                        <div className="form-title">Register</div>
                        <div className="form-body">
                            <div className="row">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    name="FirstName"
                                    onChange={this.onChange.bind(this)}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    name="LastName"
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="row">
                                <div
                                    className="phone-number"
                                    style={{ display: "contents" }}
                                >
                                    <div className="phone-number--country">
                                        <Select
                                            value={{
                                                label: Country,
                                            }}
                                            onChange={this.onSelect2}
                                            placeholder="Country code"
                                            options={CallingCodes}
                                            labelKey="Country"
                                            valueKey="value"
                                            valueRenderer={(Country) =>
                                                Country.value
                                            }
                                        ></Select>
                                    </div>
                                    <div className="phone-number--number">
                                        <input
                                            type="text"
                                            placeholder="Telephone Number"
                                            name="TelephoneNumber"
                                            onChange={this.onChangeNum.bind(
                                                this
                                            )}
                                            style={{
                                                width: "-webkit-fill-available",
                                            }}
                                            autoComplete="disabled"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ padding: 0 }}>
                                <div
                                    className="message"
                                    style={{ color: this.state.color }}
                                >
                                    {this.state.Message}
                                </div>
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    placeholder="Full Address"
                                    name="FullAddress"
                                    onChange={this.onChange.bind(this)}
                                />
                            </div>
                            <div className="row">
                                <input
                                    type="text"
                                    name="SSN"
                                    value={this.state.SSN}
                                    length="11"
                                    placeholder="Social Security Number"
                                    onChange={this.onChange.bind(this)}
                                    onKeyDown={this.onKeyDown.bind(this)}
                                />
                            </div>
                            <div className="row" style={{ padding: 0 }}>
                                <div
                                    className="message"
                                    style={{ color: this.state.SSNColor }}
                                >
                                    {this.state.SSNMsg}
                                </div>
                            </div>
                        </div>
                        <div className="rule"></div>
                        <div className="form-footer">
                            {Loading ? (
                                <a
                                    style={{
                                        background: "#5F788A",
                                        cursor: "default",
                                    }}
                                >
                                    Loading...
                                </a>
                            ) : (
                                <a href="#" onClick={this.onSubmit.bind(this)}>
                                    Sign Me Up!
                                </a>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default App;
