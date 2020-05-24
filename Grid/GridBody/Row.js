import React, { Component } from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import CheckboxEditor from "../Editors/CheckboxEditor";
import Actions from "../Formaters/Actions";

class Row extends Component {
  constructor(props) {
    super(props);

    this.rowRef = React.createRef();
    this.rHeight = 0;
    this.state = {
      rowOffset: null,
      rowHeight: null
    }
  }

  static displayName = "Row";

  static propTypes = {
    row: PropTypes.object,
    rowKey: PropTypes.any,
    rowSelection: PropTypes.object,
    columns: PropTypes.arrayOf(PropTypes.any)
  }

  getCellValue = (key) => {

    return this.props.row[key];

  };

  getCellKeyName = (name) => {
    return this.props.row[name];
  }

  getCell = (column) => {
    const { key, name, formatter } = column;
    const { rowKey } = this.props;

    const cellProps = {
      value: this.getCellValue(key),
      key: `${rowKey}${key}`,
      cellName: name,
      formatter,
      rowHeight: this.props.rowHeight,
      cellTopValue: this.state.rowOffset,
      ...column
    };

    return <Cell {...cellProps} />;

  }

  renderShowAllCheckBox = (rowSelection) => {
    if (rowSelection.showCheckbox) {
      return <CheckboxEditor rowHeight={this.props.rowHeight} {...this.props} />;
    }
  }

  render() {

    return (
      <tr ref={this.rowRef}>
        {this.renderShowAllCheckBox(this.props.rowSelection)}
        {
          this.props.columns.map((column) => {
            return (
              this.getCell(column)
            );
          })
        }
        {this.props.actions && <Actions rowHeight={this.props.rowHeight} cellTopValue={this.state.rowOffset} />}
      </tr>
    );
  }
}

export default Row;