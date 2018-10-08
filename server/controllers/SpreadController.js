let SpreadController = module.exports;
let SpreadService = require('./../services/SpreadService');

SpreadController.getDoc = async function(ctx) {

    let _name = ctx.params.name;

    if (!_name) {
        throw new Error('名称不能为空');
    }

    let doc = await SpreadService.fetchDoc(_name);
    let result = await SpreadService.fetchList(doc);

    if(Array.isArray(result) && result.length > 0) {
        return ctx.JsonResponse.success(result);
    }

    return ctx.JsonResponse.error(-1,'未找到资源');

};
