import React, { Component } from "react";
import HeaderCell from "./HeaderCell";


class HeaderRow extends Component {
    constructor(props) {
        super(props);

        this.gridHeaderRef = React.createRef();
    }

    componentDidMount() {
        this.setColoumnWidth();
    }

    setColoumnWidth = () => {

        if (!this.gridHeaderRef) {
            return;
        }

        const thArray = [...this.gridHeaderRef.current && this.gridHeaderRef.current.children];

        if (thArray && thArray.length > 2) {
            thArray.forEach(item => {
                item.style.width = `${item.clientWidth + 20}px`;
                item.style.minWidth = `${item.clientWidth + 20}px`;
            });
        }
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