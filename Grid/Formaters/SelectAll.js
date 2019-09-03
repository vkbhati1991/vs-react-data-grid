import React from "react";
import PropTypes from "prop-types";

const SelectAll = (props) => {
  return (
    <th style={{ maxWidth: 50, minWidth: 50 }}>
      <div className="grid-checkbox-container" >
        <input
          className="grid-checkbox"
          type="checkbox"
          name="select-all-checkbox"
          id="select-all-checkbox"
          ref={props.inputRef}

        />
        <label htmlFor="select-all-checkbox" onClick={props.onChange} className="grid-checkbox-label"></label>
      </div>
    </th>
  );
};

SelectAll.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

export default SelectAll;