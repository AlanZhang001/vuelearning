let SpreadController = module.exports;
let SpreadService = require('./../services/SpreadService');

SpreadController.getDoc = async function(ctx) {

    let _name = ctx.params.name;

    if (!_name) {
        throw new Error('名称不能为空');
    }

    let spreadService = new SpreadService(_name);
    let result = await spreadService.getRes();

    if (Array.isArray(result.list) && result.list.length > 0) {
        return ctx.JsonResponse.success(result);
    }

    return ctx.JsonResponse.error(-1, '未找到资源',{
        list:[]
    });

};
