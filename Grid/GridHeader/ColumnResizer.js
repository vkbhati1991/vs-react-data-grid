import React from "react";
import PropTypes from "prop-types";

class ColumnResizer extends React.Component {

    constructor(props) {
        super(props);

        this.dragging = false;
        this.startPos = 0;
        this.endPos = 0;
        this.mouseMove = 0;
        this.width = 0;
        this.thRef = React.createRef();
        this.resizeHandler = React.createRef();
    }

    static defaultProps = {
        minWidth: 0,
        className: ""
    }

    static propTypes = {
        areaLabel: PropTypes.any,
        children: PropTypes.any
    }

    startDrag = (e) => {
        //e.dataTransfer.setData("text", e.target.id);
        this.startPos = e.screenX;
        this.resizeHandler.current.classList.add("dragStart");
    }

    endDrag = (e) => {
        this.endPos = e.screenX;
        this.moveDiff = this.endPos - this.startPos;
        this.width = this.thRef.current.clientWidth;
        this.resizeHandler.current.style.transform = "translate(0, 0)";
        this.thRef.current.style.width = `${this.moveDiff + this.width}px`;
        this.thRef.current.style.minWidth = `${this.moveDiff + this.width}px`;
        this.resizeHandler.current.classList.remove("dragStart");
    }

    dragOver = (e) => {
        e.preventDefault();
        return false;
    }

    getResizeHandlerPosition = (e) => {
        this.mouseMove = e.screenX;
        this.moveDiff = this.mouseMove - this.startPos;
        this.resizeHandler.current.style.transform = `translate(${this.moveDiff}px, 0)`;
    }

    drop = (ev) => {
        ev.preventDefault();
    }

    render() {
        return (
            <th ref={this.thRef}
                onDrop={this.drop}
                onDragOver={this.dragOver}
                area-label={this.props.areaLabel}
            >
                <div className="headerCellValue">
                    {this.props.children}
                    <div
                        className="resizeDiv"
                        draggable="true"
                        onDragStart={this.startDrag}
                        ref={this.resizeHandler}
                        onDrag={this.getResizeHandlerPosition}
                        onDragEnd={this.endDrag}>
                    </div>
                </div>
            </th>
        );
    }

}

export default ColumnResizer;