/*
 * [formatDate] 日期格式化
 * formatDate(new Date(1505459719825),'YYYY-MM-DD hh:mm:ss'); //'2017-09-15 15:15:19'
 * formatDate(new Date(1505459719825),'YYYY-M-D h:m:s'); //'2017-9-15 15:15:19'
 * formatDate(new Date(1505459719825),'YYYYMMDD hhmmss'); //'20170915 151519'
 * @param {date} date 日期对象，若不是date对象，此参数会直接拿去new Date
 * @param {string} pattern 格式化模式，比如'YYYY-MM-DD hh:mm:ss'，'YYYY-M-D h:m:s'；'MM'相对'M'，表示会自动补0
 * @returns {string} 日期格式化字符串或'--'
 */
function formatDate(date, pattern = 'YYYY-MM-DD') {
    console.log(date);
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    if (date.toString() === 'Invalid Date') {
        return '--';
    }

    var year_YYYY = date.getFullYear();
    var month_M = date.getMonth() + 1;
    var day_D = date.getDate();
    var hour_h = date.getHours();
    var miniute_m = date.getMinutes();
    var second_s = date.getSeconds();

    /**
     * 数字小于10的话，会转为字符串，并在前面补0
     * @function
     * @param {int} number 可能需要补0的数字
     * @returns {string} 结果
     */
    function fillZero(number) {
        return (number + '').length > 1 ? number : '0' + number;
    }

    var month_MM = fillZero(month_M);
    var day_DD = fillZero(day_D);
    var hour_hh = fillZero(hour_h);
    var miniute_mm = fillZero(miniute_m);
    var second_ss = fillZero(second_s);

    var result = pattern
        .replace(/YYYY/g, year_YYYY)
        .replace(/MM/g, month_MM)
        .replace(/DD/g, day_DD)
        .replace(/hh/g, hour_hh)
        .replace(/mm/g, miniute_mm)
        .replace(/ss/g, second_ss)
        .replace(/M/g, month_M)
        .replace(/D/g, day_D)
        .replace(/h/g, hour_h)
        .replace(/m/g, miniute_m)
        .replace(/s/g, second_s);
    return result;
}

export {
    formatDate
};
