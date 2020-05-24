import React from "react";
import HeaderRow from "./HeaderRow";
class GridHeader extends React.PureComponent {

    static displayName = "Grid Header";

    render() {
        return (
            <thead>
                <HeaderRow {...this.props} />
            </thead>
        );
    }
}

export default GridHeader;