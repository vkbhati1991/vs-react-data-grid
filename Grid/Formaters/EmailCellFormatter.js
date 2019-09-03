import React, { Component } from "react";
import PropTypes from "prop-types";

class EmailCellFormatter extends Component {

  static propTypes = {
    value: PropTypes.any,
    color: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props);
  }

  render() {
    return (<a style={{ color: this.props.color }} href={`mailto:${this.props.value}`} title={this.props.value}>{this.props.value}</a>);
  }
}

export default EmailCellFormatter;