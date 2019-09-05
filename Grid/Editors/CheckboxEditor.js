import React, { Component } from "react";
import PropTypes from "prop-types";

class CheckboxEditor extends Component {
  static propTypes = {
    handleRowSelect: PropTypes.func,
    rowIdx: PropTypes.any,
    row: PropTypes.object,
    rowSelection: PropTypes.object,
    rowHeight: PropTypes.number,
    cellTopValue: PropTypes.number
  };

  handleChange = () => {
    if (this.props.handleRowSelect) {
      this.props.handleRowSelect(this.props.rowIdx, this.props.row);
    }

  }

  render() {
    const { rowSelection, rowIdx, rowHeight, cellTopValue } = this.props;
    const indexes = rowSelection && rowSelection.selectBy && rowSelection.selectBy.indexes;

    const checked = indexes && indexes.findIndex(el => el === rowIdx) >= 0;
    const checkboxName = `checkbox${rowIdx}`;

    const cellStyle = {
      minHeight: `${rowHeight}px`,
      height: `${rowHeight}px`,
      maxHeight: `${rowHeight}px`
    }

    const cellStyle2 = {
      top: `${cellTopValue + 1}px`
    }

    return (
      <td className="rowCheckbox" style={cellStyle2}>
        <div className="grid-checkbox-container" style={cellStyle}>
          <div className="checkbox-wrapper">
            <input id={checkboxName} className="grid-checkbox" type="checkbox" name={checkboxName} checked={checked} readOnly />
            <label htmlFor={checkboxName} className="grid-checkbox-label" onClick={this.handleChange}></label>
          </div>
        </div>
      </td>);
  }
}

export default CheckboxEditor;
