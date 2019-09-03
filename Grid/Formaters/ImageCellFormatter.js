import React, { Component } from "react";
import PropTypes from "prop-types";

class ImageCellFormatter extends Component {
  static propTypes = {
    value: PropTypes.any
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps !== this.props);
  }

  render() {
    return <div className="profileImage"><img alt="" src={this.props.value} /></div>;
  }
}

export default ImageCellFormatter;