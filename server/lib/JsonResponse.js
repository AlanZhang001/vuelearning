/**
 * 处理ctx body的返回值
 */
module.exports = class JsonResponse {
    /**
     * [constructor 构造对象]
     * @param  {Object} ctx [上下文]
     * @return {undefined}
     */
    constructor(ctx) {
        this.ctx = ctx;
    }

    /**
     * [success 成功时的处理]
     * @param  {Array}  data [数据列表]
     * @return {[type]}      [description]
     */
    success(data = []) {
        this.ctx.set('Content-Type', 'application/json');
        this.ctx.body = {
            code: 0,
            message: '成功',
            data: data
        };
    }

    /**
     * [error 失败时的处理]
     * @param  {Array}  data [数据列表]
     * @return {undefined}
     */
    error(code, message, data = []) {
        this.ctx.set('Content-Type', 'application/json');
        this.ctx.body = {
            code,
            message,
            data
        };
    }
};
