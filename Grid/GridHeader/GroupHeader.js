import React from "react";
import PropTypes from "prop-types";

class GroupHeader extends React.PureComponent {

    constructor(props) {
        super(props);
        this.dragArea = React.createRef();
    }

    static propTypes = {
        getGroupedRows: PropTypes.func,
        groupByColumn: PropTypes.array
    }

    onUnGroupBy = (unGroupy) => {
        this.props.getGroupedRows(unGroupy);
    }

    onUnGroupByDrag = (e) => {
        
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }

        if (e.stopPropagation) {
            e.stopPropagation(); // stops the browser from redirecting.
        }

        if (window.groupByObj) {
            this.props.getGroupedRows(window.groupByObj);
        }

        window.groupByObj = null;
        this.dragArea.current.style.backgroundColor = "#fff";
    }

    onGroupByDragOver = (e) => {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        if (window.groupByObj) {
            this.dragArea.current.style.backgroundColor = "#ccc";
        }
    }

    render() {
        const { groupByColumn } = this.props;

        if (!groupByColumn) {
            return null;
        }

        return (
            <div className="groupHeaderCollection">
                <div ref={this.dragArea}
                    className="groupHeaderDragArea"
                    onDragOver={this.onGroupByDragOver}
                    onDrop={(e) => this.onUnGroupByDrag(e)}
                >
                    {
                        groupByColumn.map((g, idx) => {
                            return (
                                <div key={idx} className="groupHeader__item">
                                    <button className="groupHeader-button" onClick={() => { this.onUnGroupBy({ cellKey: g.cellKey, cellName: g.cellName }); }}>
                                        <span className="buttonText">{g.cellName}</span>
                                        <span className="buttonIcon"><i className="fa fa-trash"></i></span>
                                    </button>
                                </div>
                            );
                        })
                    }
                    Drag Here...
                </div>
            </div>
        );
    }
}

export default GroupHeader;