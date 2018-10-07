/**
 * Created by user on 17/2/16.
 * koa context extension
 */
let JsonResponse = require('../lib/JsonResponse');

module.exports = function(app) {
    Object.defineProperty(app.context, 'JsonResponse', {
        get: function () {
            if (this._JsonResponse) {
                return this._JsonResponse;
            }

            const jsonResponse = new JsonResponse(this);
            this._JsonResponse = jsonResponse;
            return jsonResponse;
        }
    });
};
