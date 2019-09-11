import React from "react";
import PropTypes from "prop-types";

const Actions = (props) => {
  const { rowHeight } = props;
  const cellStyle = {
    minHeight: `${rowHeight - 4}px`,
    height: `${rowHeight - 4}px`,
    maxHeight: `${rowHeight - 4}px`
  }

  return (
    <td className="gridActions">
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