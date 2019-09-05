import React from "react";
import PropTypes from "prop-types";

const Actions = (props) => {
  const { rowHeight, cellTopValue } = props;
  const cellStyle = {
    minHeight: `${rowHeight}px`,
    height: `${rowHeight}px`,
    maxHeight: `${rowHeight}px`
  }

  const cellStyle2 = {
    top: `${cellTopValue + 1}px`
  }

  return (
    <td className="gridActions" style={cellStyle2}>
      <div className="gridActions-container" style={cellStyle}>
        <div className="gridActionItem">
          <i className="fa fa-ellipsis-h"></i>
        </div>
      </div>
    </td>
  );
};

Actions.propTypes = {
  rowHeight: PropTypes.number,
  cellTopValue: PropTypes.number
};


export default Actions;