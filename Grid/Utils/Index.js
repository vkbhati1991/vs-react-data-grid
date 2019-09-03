import Immutable from "immutable";

const isImmutableLoaded = () => typeof Immutable !== "undefined";

const isEmptyArray = (obj) => {
    return Array.isArray(obj) && obj.length === 0;
};

const isFunction = (functionToCheck) => {
    const getType = {};

    return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
};

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const isObject = (obj) => {
    return obj.constructor === Object;
};

const isImmutableCollection = (objToVerify) => {
    return isImmutableLoaded() && Immutable.Iterable.isIterable(objToVerify);
};

const getMixedTypeValueRetriever = (isImmutable) => {
    const retObj = {};
    const retriever = (item, key) => { return item[key]; };
    const immutableRetriever = (immutable, key) => { return immutable.get(key); };

    retObj.getValue = isImmutable ? immutableRetriever : retriever;

    return retObj;
};

const isImmutableMap = isImmutableLoaded() ? Immutable.Map.isMap : () => false;

const checkExistValue = (collection, value) => {
    if (Array.isArray(collection)) {
        return collection.some(el => el.cellKey === value.cellKey);
    }

    return null;
};

export { isEmptyArray, checkExistValue, isFunction, isEmptyObject, isObject, isImmutableCollection, getMixedTypeValueRetriever, isImmutableMap };