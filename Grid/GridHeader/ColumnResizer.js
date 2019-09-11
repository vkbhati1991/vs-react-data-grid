
import React from "react";
import PropTypes from "prop-types";

class ColumnResizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dragging: false,
            startPos: 0,
            endPos: 0,
            moveDiff: 0,
            width: 0,

        }
        this.thRef = React.createRef();
        this.resizeHandler = React.createRef();
        this.moveDiff = 0;
    }

    static defaultProps = {
        minWidth: 0,
        className: ""
    }

    static propTypes = {
        areaLabel: PropTypes.any,
        children: PropTypes.any
    }

    componentDidMount() {
        this.setState({
            width: this.thRef.current.clientWidth
        }, () => {
            this.thRef.current.style.width = `${this.state.width}px`;
            this.thRef.current.style.minWidth = `${this.state.width}px`;
        });

    }

    handleMouseMove = (e) => {
        if (this.state.dragging) {

            this.moveDiff = e.pageX - this.state.startPos
            this.resizeHandler.current.style.transform = `translate(${this.moveDiff}px, 0)`;
        }

    }

    handleMouseDown = (e) => {
        if (this.state.dragging === false) {
            this.thRef.current.parentNode.addEventListener("mousemove", this.handleMouseMove);
            this.thRef.current.parentNode.addEventListener("mouseleave", this.handleMouseOut);
            this.resizeHandler.current.addEventListener("mouseup", this.handleMouseUp);
            this.setState({
                startPos: e.pageX,
                dragging: true
            });
            this.moveDiff = 0;
        }
    }

    handleMouseUp = () => {
        if (this.state.dragging) {
            const cellWidth = this.state.width + this.moveDiff;
            this.resizeHandler.current.style.transform = `translate(${0}px, 0)`;
            this.thRef.current.style.width = `${cellWidth}px`;
            this.thRef.current.style.minWidth = `${cellWidth}px`;
            this.setState({
                width: cellWidth,
                dragging: false
            });
            this.moveDiff = 0;
        }

    }


    handleMouseOut = () => {
        this.thRef.current.parentNode.removeEventListener("mousemove", this.handleMouseMove);
        this.thRef.current.parentNode.removeEventListener("mouseleave", this.trMouseUp);
        this.resizeHandler.current.removeEventListener("mouseup", this.handleMouseUp);
        if (this.state.dragging) {
            this.resizeHandler.current.style.transform = `translate(${0}px, 0)`;
            this.thRef.current.style.width = `${this.state.width}px`;
            this.thRef.current.style.minWidth = `${this.state.width}px`;
            this.setState({
                dragging: false
            });
            this.moveDiff = 0;
        }
    }

    render() {
        return (
            <th ref={this.thRef} area-label={this.props.areaLabel}>
                <div className="headerCellValue">
                    {this.props.children}
                    <div
                        className="resizeDiv"
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                        ref={this.resizeHandler}>
                    </div>
                </div>
            </th>
        );
    }

}

export default ColumnResizer;