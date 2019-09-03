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
        rowHeight: PropTypes.number,
        columnMetrics: PropTypes.object,
        columns: PropTypes.array,
        cellMetaData: PropTypes.object,
        setExpandbleRows: PropTypes.func,
        rowSelection: PropTypes.object,
        handleRowSelect: PropTypes.func,
        renderRows: PropTypes.array,
        rowRenderer: PropTypes.func
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
        const { cellMetaData, setExpandbleRows, rowSelection, handleRowSelect, renderRows } = this.props;

        const renderRowsCollection = renderRows.map((r, idx) => {
            const rowKey = `rowKey${idx}`;
            const rowIdx = rowKey;

            return r && this.renderRow({
                key: rowKey,
                rowKey,
                row: r,
                columns,
                cellMetaData,
                setExpandbleRows,
                rowSelection,
                rowIdx,
                handleRowSelect

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