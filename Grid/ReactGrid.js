import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorContainer from "./ErrorContainer";
import Grid from "./Grid";

/* <Grid
    columns={columns}
    rowGetter = {i=>rows[i]}
    rowCount={10}
/> */

class ReactGrid extends Component {

    static displayName = "ReactGrid";

    static defaultProps = {
        showHeader: true
    }

    static propTypes = {
        showHeader: PropTypes.bool,
        rowGetter: PropTypes.func.isRequired,
        rowCount: PropTypes.number.isRequired,
        columns: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.node.isRequired,
            key: PropTypes.string.isRequired,
            formatter: PropTypes.any,
            sortable: PropTypes.bool,
            dragable: PropTypes.bool,
            color: PropTypes.string,
            bgColor: PropTypes.string,
            resizable: PropTypes.bool

        })).isRequired,
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
        emptyRowsContainer: PropTypes.any,
        rowKey: PropTypes.any
    }

    constructor(props) {
        super(props);
        const columnMetrics = this.createColumnMetrics();
        const initialState = { columnMetrics };
        this.state = initialState;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const checkSameProps = nextProps.columns !== prevState.columnMetrics.columns;
        if (checkSameProps) {
            const columnMetrics = {
                columns: nextProps.columns
            };

            return columnMetrics;
        }

        return null;
    }

    createColumnMetrics = (props = this.props) => {
        const gridColumns = props.columns;

        return {
            columns: gridColumns
        };
    }

    renderEmptyRows = () => {
        const { columns } = this.state.columnMetrics;
        if (!columns) {
            return null;
        }
        const EmptyRowsContainer = this.props.emptyRowsContainer;
        const colspan = columns && columns.length;

        return (
            <tbody className="emptyRowsContainer">
                <tr>
                    <td colSpan={colspan}>
                        {this.props.emptyRowsContainer ? <EmptyRowsContainer /> : "No Data Found"}
                    </td>
                </tr>

            </tbody>
        );
    }

    render() {

        const PropsMatrix = {
            columnMetrics: this.state.columnMetrics,
            rowKey: this.props.rowKey,
            rowGetter: this.props.rowGetter,
            rowCount: this.props.rowCount,
            renderEmptyRows: this.renderEmptyRows,
            rowSelection: this.props.rowSelection,
            showHeader: this.props.showHeader,
            rowRenderer: this.props.rowRenderer
        };

        return (
            <div className="crmGridContainer">
                <ErrorContainer>
                    <Grid {...PropsMatrix} />
                </ErrorContainer>
            </div>
        );
    }
}

export default ReactGrid;