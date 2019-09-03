import React, { Component } from "react";

class GridFooter extends Component {
    static displayName = "Grid Footer";
    renderABCfilter = (filterChars) => {
        return (
            <div className="abcFilter">
                {
                    filterChars.map((filterChar, index) => {
                        return <div key={index} className="abcFilter__item">{filterChar}</div>
                    })
                }

            </div>
        )
    }
    render() {
        const filterChars = ["All", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        return (
            <div className="crmGridFooter">
                {this.renderABCfilter(filterChars)}
            </div>
        )
    }
}

export default GridFooter;




