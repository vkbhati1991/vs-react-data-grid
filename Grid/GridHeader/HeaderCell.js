import React, { Component } from "react";
import PropTypes from "prop-types";
import ColumnResizer from "./ColumnResizer";

class HeaderCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            onAssendingSort: false
        };
    }

    static defaultProps = {
        rowRenderer: false
    }

    static propTypes = {
        getGroupedRows: PropTypes.func,
        onSort: PropTypes.func,
        cell: PropTypes.object,
        groupByColumn: PropTypes.array
    }

    onGroupBy = (groupBy) => {
        this.props.getGroupedRows(groupBy);
    }

    onSort = () => {
        this.setState({
            onAssendingSort: !this.state.onAssendingSort
        });

        if (this.props.onSort) {
            this.props.onSort();
        }

    }

    render() {
        const { cell, groupByColumn, rowRenderer } = this.props;
        const { onAssendingSort } = this.state;

        if (!cell) {
            return;
        }

        const { draggable: isGroupIcon, IsSortable: setSortable } = cell;
        const isClassActive = groupByColumn.findIndex(el => el.cellKey === cell.key) >= 0;
        const getHeaderCellClass = isClassActive ? "headerCellValue__group isActive" : "headerCellValue__group";
        const getIcon = onAssendingSort ? "fa fa-long-arrow-down" : "fa fa-long-arrow-up";

        return (
            <ColumnResizer areaLabel={cell.name}>
                {
                    (isGroupIcon && !rowRenderer) && <div className={getHeaderCellClass}
                        onClick={() => { this.onGroupBy({ cellKey: cell.key, cellName: cell.name }); }}>
                        <i className="fa fa-group"></i>
                    </div>
                }
                <div className="headerCellValue__content" onClick={setSortable && this.onSort}>
                    {cell.name}
                </div>
                {
                    setSortable && <span className="headerCellValue__sortingicon" onClick={this.onSort}>
                        <i className={getIcon}></i>
                    </span>
                }
            </ColumnResizer>
        );
    }
}

export default HeaderCell;