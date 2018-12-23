let SpreadController = module.exports;
let SpreadService = require('./../services/SpreadService');

SpreadController.getDoc = async function(ctx) {

    let _name = ctx.params.name;

    if (!_name) {
        throw new Error('名称不能为空');
    }

    let spreadService = new SpreadService();
    let result = await spreadService.getRes(_name);

    if (Array.isArray(result.list) && result.list.length > 0) {
        return ctx.JsonResponse.success(result);
    }

    return ctx.JsonResponse.error(-1, '未找到资源',{
        list:[]
    });

};

SpreadController.batchFetch = async function(ctx){
    let spreadService = new SpreadService();
    let list = await spreadService.fetchBatch();
    return ctx.JsonResponse.success({
        list,
        sourceSite: '本地数据',
        isFromCache: true
    });
};
