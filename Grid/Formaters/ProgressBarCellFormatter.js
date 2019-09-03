import React, { Component } from "react";
import PropTypes from "prop-types";

class ProgressBarCellFormatter extends Component {

  static propTypes = {
    value: PropTypes.any,
    color: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props);
  }

  render() {
    return (<div className="progressBar" title={this.props.value}>
      <div style={{ backgroundColor: this.props.color || "#000", color: "#fff", width: `${this.props.value}%` }} className="progressBarInner">{`${this.props.value}%`}</div>
    </div>);
  }
}
export default ProgressBarCellFormatter;