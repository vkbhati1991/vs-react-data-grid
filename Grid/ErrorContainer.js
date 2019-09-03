import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    static propTypes = {
        children: PropTypes.any
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error, errorInfo
        });
    }

    renderError = () => {
        return (
            <div className="errorContainer">
                <h2>Something Wrong!!!!!!!!</h2>
                <details style={{ whiteSpace: "pre-wrap" }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                </details>
            </div >
        );
    }
    render() {
        const { children } = this.props;
        if (this.state.errorInfo) {
            return this.renderError();
        }

        return children;
    }
}

export default ErrorContainer;