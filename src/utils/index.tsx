import { parse } from "query-string";
import { API_URL, QS_STRING } from "./constants";

export const _isInLocalStorage = (key: any) => {
  let val = localStorage.getItem(key);
  if (!!val && val !== "null" && val !== "undefined") {
    return val;
  } else {
    return "";
  }
};

export const getIn = (obj: any, ...restParams: any) => {
  if (typeof obj === "undefined" || obj === null) {
    return null;
  }
  const validateObj = (object: any, key: any) => {
    return ["undefined"].indexOf(typeof object[key]) === -1
      ? object[key]
      : null;
  };
  const paramLen = restParams.length;
  let currentIndex = 0,
    currentVal = validateObj(obj, restParams[currentIndex]);

  while (currentVal !== null) {
    // 如果已经是最后一层结构，直接返回
    if (currentIndex === paramLen - 1) {
      return currentVal;
    }
    // 如果不是最后一层且值存在，进行深层判断
    if (currentVal !== null) {
      currentIndex++;
      currentVal = validateObj(currentVal, restParams[currentIndex]);
    } else {
      return null;
    }
  }
};

export const getType = (obj: any) => {
  let objType = Object.prototype.toString.call(obj);
  if (objType === "[object String]") {
    return "String";
  } else if (objType === "[object Array]") {
    return "Array";
  } else if (objType === "[object Object]") {
    if (Object.keys(obj).length === 0) {
      return "EmptyObject";
    }
    return "Object";
  } else if (objType === "[object Function]") {
    return "Function";
  } else if (objType === "[object Undefined]") {
    return "Undefined";
  } else if (objType === "[object Null]") {
    return "Null";
  }
};

export const setQS: any = (QSString: any) => {
  localStorage.setItem(QS_STRING, QSString);
  if (QSString && QSString !== "null") {
    try {
      let QS = JSON.parse(QSString);
      return QS;
    } catch (e) {
      return {};
    }
  } else {
    return {};
  }
};

export const getQS = () => {
  let QSString = _isInLocalStorage(QS_STRING);
  if (QSString) {
    return setQS(QSString);
  } else {
    return {};
  }
};

export const getQSInfo = () => {
  let QS: any = parse(window.location.search);
  if (getType(QS) === "EmptyObject") {
    QS = getQS();
  } else {
    // let QSString = _isInLocalStorage(QS_STRING);
    if (QS["resetQS"]) {
      QS = setQS(JSON.stringify({}));
    } else {
      let QSString = JSON.stringify(QS);
      QS = setQS(QSString);
    }
  }

  /*eslint no-useless-escape: "off"*/
  let api = QS["api"] || _isInLocalStorage(API_URL);
  if (api) {
    const protocol = window.location.protocol;
    if (protocol === "https:") {
      api = api.replace(/^http\:/, "https:");
    } else if (protocol === "http:") {
      api = api.replace(/^https\:/, "http:");
    } else {
      console.log("protocol not supported!");
    }
    QS = {
      ...QS,
      api,
    };
  }

  return QS;
};
