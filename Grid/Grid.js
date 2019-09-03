import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorContainer from "./ErrorContainer";
import GroupHeader from "./GridHeader/GroupHeader";
import GridHeader from "./GridHeader/GridHeader";
import GridBody from "./GridBody/GridBody";
import SelectAll from "./Formaters/SelectAll";
import { isObject } from "./Utils/Index";
import groupBy from "lodash/groupBy";

class Grid extends Component {
    constructor(props) {
        super(props);

        this.tableContainer = React.createRef();
        this.state = {
            rows: this.getRows(props),
            catcheRows: this.getRows(props),
            groupByColumn: [],
            isGroupActive: false
        };

        this.expandedRows = [];
        this.selectedRows = [];

    }
    static displayName = "Grid";

    static propTypes = {
        showHeader: PropTypes.bool,
        columnMetrics: PropTypes.object,
        rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
        rowCount: PropTypes.number,
        PropsMatrix: PropTypes.object,
        renderEmptyRows: PropTypes.func,
        rowRenderer: PropTypes.func,
        rowSelection: PropTypes.shape({
            onRowsSelected: PropTypes.func,
            onRowsDeselected: PropTypes.func,
            showCheckbox: PropTypes.bool,
            selectBy: PropTypes.oneOfType([
                PropTypes.shape({
                    indexes: PropTypes.arrayOf(PropTypes.any).isRequired
                })
            ])
        }),
        selectAllRenderer: PropTypes.func
    }

    getRows = (props) => {
        const { rowGetter, rowCount } = props;

        if (!rowGetter) {
            return null;
        }

        if (Array.isArray(rowGetter)) {
            return rowGetter(0, rowCount);
        }

        const rows = [];

        let i = 0;
        while (i < rowCount) {
            const row = rowGetter(i);
            rows.push(row);
            i++;
        }

        return rows;
    }

    getNextColKey = (colkey) => {
        const { groupByColumn } = this.state;

        if (!colkey) {
            return null;
        }

        const index = groupByColumn.indexOf(colkey);
        if (index >= 0) {
            return groupByColumn[index + 1];
        }

        return null;
    }

    setExpandbleRows = (groupIdx) => {
        const { catcheRows, groupByColumn } = this.state;
        const expandedRowsIndex = this.expandedRows.findIndex(el => el === groupIdx);

        if (expandedRowsIndex < 0) {
            this.expandedRows.push(groupIdx);
        } else {
            this.expandedRows.splice(expandedRowsIndex, 1);
        }

        const grc = this.setGroupRow(catcheRows, groupByColumn[0], "");

        this.setState({
            rows: grc
        });

    }
    setGroupRow = (catcheRows, colkey, prvTitle) => {
        const { groupByColumn } = this.state;
        if (!catcheRows) {
            return null;
        }

        if (!colkey) {
            return catcheRows;
        }

        let grc = [];
        const groupRows = groupBy(catcheRows, colkey.cellKey || null);
        if (isObject(groupRows)) {
            const keys = Object.keys(groupRows);
            for (let i = 0; i < keys.length; i++) {

                const groupTitle = keys[i];
                const treeDepth = groupByColumn.indexOf(colkey);
                const groupIdx = prvTitle + groupTitle;

                const addHeader = {
                    groupTitle,
                    isGrouping: true,
                    treeDepth,
                    groupIdx
                };
                grc.push(addHeader);

                const expandedRow = this.expandedRows.find(r => r === groupIdx);

                if (expandedRow) {
                    continue;
                }

                let groupValue = groupRows[groupTitle];
                const nextColKey = this.getNextColKey(colkey);
                if (nextColKey) {
                    groupValue = this.setGroupRow(groupValue, nextColKey, addHeader.groupIdx);
                }
                grc = grc.concat(groupValue);
            }

        }

        return grc;
    }

    getGroupedRows = (groupBy) => {

        const { catcheRows, groupByColumn } = this.state;
        const groupByIndex = groupByColumn.findIndex(el => el.cellKey === groupBy.cellKey);

        if (groupByIndex < 0) {
            groupByColumn.push(groupBy);
        } else {
            groupByColumn.splice(groupByIndex, 1);
        }
        const grc = this.setGroupRow(catcheRows, groupByColumn[0], "");

        this.setState({
            rows: grc,
            groupByColumn,
            isGroupActive: !this.state.isGroupActive
        });

    }

    handleCheckboxChange = () => {
        const { rows } = this.state;
        const { onRowsSelected, onRowsDeSelected } = this.props && this.props.rowSelection;
        if (this.selectedRows.length <= 0) {
            this.selectedRows = rows.map((rowdata, idx) => {
                const rowIdx = `rowKey${idx}`;

                return { rowIdx, row: rowdata };
            });

            onRowsSelected(this.selectedRows);

        } else {
            onRowsDeSelected(this.selectedRows);
            this.selectedRows = [];
        }
    }

    selectAllComponent = () => {
        const SelectAllComp = this.props.selectAllRenderer || SelectAll;
        const SelectAllRenderer = <SelectAllComp onChange={this.handleCheckboxChange} />;

        return SelectAllRenderer;
    }

    isRowSelected = (indexes, rowIdx) => {
        if (Array.isArray(indexes)) {
            return indexes.indexOf(rowIdx) > -1;
        }

        return false;
    }

    handleRowSelect = (rowIdx, rowData) => {
        const { indexes } = this.props && this.props.rowSelection && this.props.rowSelection.selectBy;
        const { onRowsSelected, onRowsDeSelected } = this.props && this.props.rowSelection;
        const isPreviouslySelected = this.isRowSelected(indexes, rowIdx);

        if (isPreviouslySelected) {
            onRowsDeSelected([{ rowIdx, row: rowData }]);
        } else {
            onRowsSelected([{ rowIdx, row: rowData }]);
        }
    }

    render() {
        const { rowCount, renderEmptyRows, columnMetrics, rowSelection, showHeader, rowRenderer } = this.props;

        const HeaderMetaData = {
            columnMetrics,
            getGroupedRows: this.getGroupedRows,
            isGroupActive: this.state.isGroupActive,
            groupByColumn: this.state.groupByColumn,
            rowSelection,
            selectAllComponent: this.selectAllComponent,
            rowRenderer
        };

        return (
            <div className="tableContainer" ref={this.tableContainer}>
                {this.state.groupByColumn.length > 0 && <ErrorContainer><GroupHeader {...HeaderMetaData} /></ErrorContainer>}
                <table className="crmGrid">
                    {showHeader && <ErrorContainer><GridHeader {...HeaderMetaData} /></ErrorContainer>}
                    {rowCount >= 1 ? <ErrorContainer><GridBody handleRowSelect={this.handleRowSelect} setExpandbleRows={this.setExpandbleRows} renderRows={this.state.rows} {...this.props} /></ErrorContainer> : renderEmptyRows()}
                </table>
            </div>
        );
    }
}

export default Grid;