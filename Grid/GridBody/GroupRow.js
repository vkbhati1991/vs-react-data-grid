import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class GroupRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isExpandView: false
        };
    }

    static propTypes = {
        setExpandbleRows: PropTypes.func,
        row: PropTypes.object,
        columns: PropTypes.arrayOf(PropTypes.any),
        rowSelection: PropTypes.object
    };
    
    setExpandView = () => {
        const { row } = this.props;
        const { groupIdx } = row;
        this.props.setExpandbleRows(groupIdx);
        this.setState({
            isExpandView: !this.state.isExpandView
        });
    }
    render() {
        const GroupWrapper = Fragment;
        const { columns, row, rowSelection } = this.props;
        const { groupTitle, treeDepth } = row;
        const colspan = rowSelection ? columns.length + 1 : columns.length;
        const style = {
            paddingLeft: `${16 * treeDepth}px`
        };

        return (
            <GroupWrapper>
                <tr>
                    <td className="groupHeader" colSpan={colspan}>
                        <div style={style} className="growupRow" onClick={this.setExpandView}>
                            <div className="groupHeader__icon"><i className={this.state.isExpandView ? "fa fa-chevron-up" : "fa fa-chevron-down"}></i></div>
                            <div className="groupHeader__title"> {groupTitle}</div>
                        </div>
                    </td>
                </tr>
            </GroupWrapper>
        );
    }
}

export default GroupRow;