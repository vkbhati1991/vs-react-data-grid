import React, { Component } from "react";
import PropTypes from "prop-types";
import RowsRenderer from "./RowsRenderer";
import Row from "./Row";
import GroupRow from "./GroupRow";

class RowsContainer extends Component {

    static displayName = "RowsContainer";
    static propTypes = {
        rowGetter: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
        rowsCount: PropTypes.number,
        columnMetrics: PropTypes.object,
        columns: PropTypes.array,
        cellMetaData: PropTypes.object,
        setExpandbleRows: PropTypes.func,
        rowSelection: PropTypes.object,
        handleRowSelect: PropTypes.func,
        renderRows: PropTypes.array,
        rowRenderer: PropTypes.func,
        rowHeight: PropTypes.number
    };

    static defaultProps = {
        rowsHeight: null
    };

    renderGroupRow = (props) => {
        return <GroupRow {...props} />;
    }

    renderCustomRow = (rowRenderer, props) => {
        const CustomRow = rowRenderer;
        const { columns, rowSelection } = props;
        const columnsSize = columns && columns.length;
        const colspan = rowSelection ? columnsSize + 1 : columnsSize;
        return (
            <tr key={props.rowKey}>
                <td colSpan={colspan}><CustomRow  {...props} /></td>
            </tr>
        );

    }

    renderRow = (props) => {
        const { row } = props;
        const { rowRenderer } = this.props;

        if (rowRenderer) {
            return this.renderCustomRow(rowRenderer, props);
        }

        if (row.isGrouping) {
            return this.renderGroupRow(props);
        }

        return <Row {...props} />;
    }

    render() {

        const { columnMetrics } = this.props;
        const { columns } = columnMetrics;
        const { cellMetaData, setExpandbleRows, rowSelection, handleRowSelect, renderRows, actions } = this.props;
        const rowLength = renderRows.length;
        const renderRowsCollection = renderRows.map((r, idx) => {
            const rowKey = r.id > -1 ? `rowKey${r && r.id}` : `rowKey${rowLength + idx}`;
            const rowIdx = rowKey;
            const rowIdxVal = r.id > -1 ? r && r.id : rowLength + idx;
            return r && this.renderRow({
                key: rowKey,
                rowKey,
                row: r,
                columns,
                cellMetaData,
                setExpandbleRows,
                rowSelection,
                rowIdx,
                handleRowSelect,
                rowIdxVal,
                rowLength,
                actions
            });
        });

        return (
            <RowsRenderer>
                {renderRowsCollection}
            </RowsRenderer>
        );
    }
}

export default RowsContainer;