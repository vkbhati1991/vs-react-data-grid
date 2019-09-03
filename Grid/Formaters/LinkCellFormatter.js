import React, { Component } from "react";
import PropTypes from "prop-types";

class LinkCellFormatter extends Component {

  static propTypes = {
    value: PropTypes.any,
    color: PropTypes.string
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props);
  }

  render() {
    return (<a style={{ color: this.props.color, cursor: "pointer", textDecoration: "underline" }} href="#foo" title={this.props.value}>{this.props.value}</a>);
  }
}

export default LinkCellFormatter;