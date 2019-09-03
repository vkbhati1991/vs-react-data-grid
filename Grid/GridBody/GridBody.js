import React from "react";
import PropTypes from "prop-types";
import RowsContainer from "./RowsContainer";

class GridBody extends React.PureComponent {

    static displayName = "GridBody";

    static propTypes = {
        renderRows: PropTypes.array
    }

    render() {
        return (
            <tbody>
                <RowsContainer renderRows={this.props.renderRows} {...this.props} />
            </tbody>
        );
    }
}

export default GridBody;