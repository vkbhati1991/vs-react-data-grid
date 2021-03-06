import React, { Component } from "react";
import PropTypes from "prop-types";
import SimpleCellFormatter from "../Formaters/SimpleCellFormatter";
import EmailCellFormatter from "../Formaters/EmailCellFormatter";
import LinkCellFormatter from "../Formaters/LinkCellFormatter";
import ProgressBarCellFormatter from "../Formaters/ProgressBarCellFormatter";
import ActionsCellFormatter from "../../../../utils/ActionsCellFormatter";

class Cell extends Component {

    static propTypes = {
        value: PropTypes.any,
        color: PropTypes.string,
        formatter: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),
        bgColor: PropTypes.string,
        cellName: PropTypes.any
    }

    getFormater = (value, Formatter, color) => {
        switch (Formatter) {
            case "email":
                return <EmailCellFormatter color={color} value={value} />;
            case "link":
                return <LinkCellFormatter color={color} value={value} />;
            case "progress":
                return <ProgressBarCellFormatter color={color} value={value} />;
            case "actions":
                return <ActionsCellFormatter value={value} />;
                
            default:
                return <Formatter value={value} />;
        }
    }

    setValue = () => {
        const { value, formatter, color } = this.props;
        if (formatter) {
            return this.getFormater(value, formatter, color);
        }

        return <SimpleCellFormatter value={value} />;
    }

    render() {
        const { bgColor, cellName, rowHeight } = this.props;

        const cellStyle = {
            minHeight: `${rowHeight}px`,
            height: `${rowHeight}px`,
            maxHeight: `${rowHeight}px`
        }

        const cellStyle2 = {
            backgroundColor: bgColor
        }

        return (
            <td className="grid-cell" data-attr={cellName} style={cellStyle2}>
                <div className="grid-cell-value" style={cellStyle}>{this.setValue()}</div>
            </td>
        );
    }
}

export default Cell;
