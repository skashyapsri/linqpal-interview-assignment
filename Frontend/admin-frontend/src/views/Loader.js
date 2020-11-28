import React from "react";
import "./loader.css";
class Loader extends React.Component {
    render() {
        return (
            <>
                <div className="content">
                    <svg className="spinner" viewBox="0 0 50 50">
                        <circle
                            className="path"
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            strokeWidth="5"
                        ></circle>
                    </svg>
                </div>
            </>
        );
    }
}

export default Loader;
