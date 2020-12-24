/**
 * 判断是否是手机
 * @param {string} str
 * @return {boolean} 是否是手机
 */
function isPhoneNumber (str) {
  let phoneReg = /^1([3456789])\d{9}$/;
  return phoneReg.test(str);
}

/**
 * 判断是否是手机或电话号码
 * @param {string} str
 * @return {boolean} 是否是手机或电话号码
 */
function isCallNumber (str) {
  let reg = /^(1([3456789])\d{9}|(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})$/;
  return reg.test(str);
}

/**
 * 格式化成大概时间
 * @param {number} dateTimeStamp 时间戳
 * @return {string}大概时间
 */
function timeDiff (dateTimeStamp) {
  dateTimeStamp *= 1000;
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return '';
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result = '';
  if (monthC >= 1) {
    result = '' + parseInt(monthC) + '月前';
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC) + '周前';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC) + '天前';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC) + '小时前';
  } else if (minC >= 1) {
    result = '' + parseInt(minC) + '分钟前';
  } else {
    result = '刚刚';
  }
  return result;
}

/**
 * 格式化成指定格式的时间
 * @param {Date | Number} time 时间戳
 * @param {string} fmt 格式化的格式
 * @return {string} 格式后的时间
 */
function timeFormat (time, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!time) return '';
  time = Math.floor(time);
  if (isNumber(time)) {
    if (time.toString().length >= 13) {
      time = new Date(time);
    } else {
      time = new Date(time * 1000);
    }
  }
  let o = {
    'M+': time.getMonth() + 1, // 月份
    'd+': time.getDate(), // 日
    'h+': time.getHours(), // 小时
    'm+': time.getMinutes(), // 分
    's+': time.getSeconds(), // 秒
    'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
    S: time.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
}

/**
 * 判断身份证是否正确
 * 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
 * @param {string} card
 * @return {boolean} 是否正确
 */
function isCardNo (card) {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card);
}

/**
 * 获取倒计时
 * @param {number} haveTime
 * @param {boolean} returnDate // 返回时分秒
 * @param {boolean} returnFalse // 失败时返回布尔值
 */
function getCountTime (haveTime, returnDate = false, returnFalse = false) {
  if (typeof haveTime !== 'number') {
    return false;
  }
  haveTime = Math.floor(haveTime / 1000);
  if (haveTime <= 0) {
    if (returnFalse) return false;
    return ['00', '00', '00', '01'];
  }
  let day = Math.floor(haveTime / 3600 / 24);
  let hour = Math.floor(haveTime / 3600 - 24 * day);
  let minute = Math.floor((haveTime - 3600 * hour - 24 * 3600 * day) / 60);
  let second = haveTime % 60;
  const completeNum = num => (num < 10 ? '0' + num : num);
  if (returnDate) {
    return [day, hour, minute, second].map(item => completeNum(item));
  }
  return `${day}天${hour}小时${minute}分钟${second}秒`;
}

/**
 * 补全图片地址
 * @param {string} url
 * @param {string} prefix
 */
function fullImgUrl (url, prefix = process.env.VUE_APP_BASE_IMG_URL) {
  if (!url) {
    return url;
  }
  if (url.indexOf('http') !== -1) {
    return url;
  } else {
    return prefix + url;
  }
}

/**
 * 计算经纬度两点距离
 * @param {number} lat1
 * @param {number} lng1
 * @param {number} lat2
 * @param {number} lng2
 * @return {number} 千米
 */
function calcPointLength (lat1, lng1, lat2, lng2) {
  let radLat1 = (lat1 * Math.PI) / 180.0;
  let radLat2 = (lat2 * Math.PI) / 180.0;
  let a = radLat1 - radLat2;
  let b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s;
}

/**
 * 节流
 * @param  {function} func
 * @param  {number} wait=1000
 */
function throttle (func, wait = 1000) {
  // 利用闭包保存定时器和上次执行时间
  let previous; // 上次执行时间
  return function () {
    const context = this;
    const args = arguments;
    const now = +new Date(); // 转换成当前时刻时间戳
    if (previous && now < previous + wait) {
      // 周期之中
      return false;
    } else {
      previous = now;
      func.apply(context, args); // 严格模式闭包内层函数this === undefined
    }
  };
}

/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
function debounce (method, delay = 1000) {
  let timer = null;
  return function () {
    let self = this;
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      method.apply(self, args);
    }, delay);
  };
}

/**
 * 属性判断
 */
const isPrototype = data => {
  return Object.prototype.toString.call(data).toLowerCase();
};

function isArray (data) {
  return isPrototype(data) === '[object array]';
}

function isJSON (data) {
  return isPrototype(data) === '[object object]';
}

function isFunction (data) {
  return isPrototype(data) === '[object function]';
}

function isString (data) {
  return isPrototype(data) === '[object string]';
}

function isNumber (data) {
  return isPrototype(data) === '[object number]';
}

function isUndefined (data) {
  return isPrototype(data) === '[object undefined]';
}

function isNull (data) {
  return isPrototype(data) === '[object null]';
}

/**
 * num传入的数字，n需要的字符长度
 * @return {string | number} num
 * @return {number} n
 */
function PrefixInteger (num, n = 2) {
  return (new Array(n).join(0) + num).slice(-n);
}

/**
 * px转换rem
 * */
function pxToRem (px = 0, rem = 75) {
  return px / 75;
}

/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv (arg1, arg2) {
  if (Number(arg2) === 0) return 0;
  let t1 = 0;
  let t2 = 0;
  let r1, r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) {
  }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}

/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul (arg1, arg2) {
  let m = 0;
  let s1 = arg1.toString();
  let s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {
  }
  try {
    m += s2.split('.')[1].length;
  } catch (e) {
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub (arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); // last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd (arg1, arg2) {
  let r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    let cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}

/**
 * 时间差 返回天
 * */
function dateDifference (sDate1, sDate2) {
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  const dateSpan = sDate1 - sDate2;
  return Math.floor(dateSpan / (24 * 3600 * 1000));
}

export default {
  isPhoneNumber,
  isCallNumber,
  timeDiff,
  timeFormat,
  isCardNo,
  getCountTime,
  fullImgUrl,
  calcPointLength,
  throttle,
  debounce,
  isArray,
  isJSON,
  isFunction,
  isString,
  isNumber,
  isUndefined,
  isNull,
  PrefixInteger,
  pxToRem,
  accDiv,
  accMul,
  accSub,
  accAdd,
  dateDifference
};
