let SiteController = exports;

SiteController.test = async function(ctx){
    await ctx.render('test/index');
};
SiteController.spread = async function(ctx){
    await ctx.render('spread/index',{
        header: ctx.i18n.__('想你所想')
    });
};
