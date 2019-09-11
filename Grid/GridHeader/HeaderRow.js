import React, { Component } from "react";
import HeaderCell from "./HeaderCell";


class HeaderRow extends Component {
    constructor(props) {
        super(props);

        this.gridHeaderRef = React.createRef();
    }

    renderShowAllCheckBox = (rowSelection) => {
        if (rowSelection.showCheckbox) {
            return this.props.selectAllComponent()
        }
    }

    render() {
        const { columns } = this.props.columnMetrics;
        return (
            <tr ref={this.gridHeaderRef}>
                {this.renderShowAllCheckBox(this.props.rowSelection)}
                {
                    columns.map((cell, index) => {
                        return <HeaderCell key={index} cell={cell} {...this.props} />
                    })
                }
            </tr>
        )
    }
}

export default HeaderRow;