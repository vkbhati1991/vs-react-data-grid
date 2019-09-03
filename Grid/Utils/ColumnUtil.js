import Immutable from "immutable";

const getColumn = (columns, idx) => {
    if (Array.isArray(columns)) {
        return columns[idx];
    } else if (typeof Immutable !== "undefined") {
        return columns.get(idx);
    }
}

const getSize = (columns) => {
    if (Array.isArray(columns)) {
        return columns.length;
    } else if (typeof Immutable !== "undefined") {
        return columns.size;
    }
}

const getValue = (column, property) => {
    let value;
    if (column.toJSON && column.get) {
        value = column.get(property)
    } else {
        value = column[property];
    }
    return value;
}

export { getColumn, getSize, getValue }