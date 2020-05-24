import React, { Component } from "react";
import PropTypes from "prop-types";

class SimpleCellFormatter extends Component {

  static propTypes = {
    value: PropTypes.any
  }
  
    shouldComponentUpdate(nextProps) {
      return (nextProps !== this.props);
    }
  
    render() {
      if(Array.isArray(this.props.value)){
        return null;
      }
      return (<div title={this.props.value}>{this.props.value}</div>);
    }
  }

  export default SimpleCellFormatter;