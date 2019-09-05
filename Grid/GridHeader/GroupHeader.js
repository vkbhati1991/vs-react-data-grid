import React from "react";
import PropTypes from "prop-types";

class GroupHeader extends React.PureComponent {
    static propTypes = {
        getGroupedRows: PropTypes.func,
        groupByColumn: PropTypes.array
    }

    onUnGroupy = (unGroupy) => {
        this.props.getGroupedRows(unGroupy);
    }

    render() {
        const { groupByColumn } = this.props;

        if (!groupByColumn) {
            return null;
        }

        return (
            <div className="groupHeaderCollection">
                {
                    groupByColumn.map((g, idx) => {
                        return (
                            <div key={idx} className="groupHeader__item">
                                <button className="groupHeader-button" onClick={() => { this.onUnGroupy({ cellKey: g.cellKey, cellName: g.cellName }); }}>
                                    <span className="buttonText">{g.cellName}</span>
                                    <span className="buttonIcon"><i className="fa fa-trash"></i></span>
                                </button>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default GroupHeader;