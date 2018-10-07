let SiteController = exports;

SiteController.test = async function(ctx){
    await ctx.render('test/index');
};
SiteController.spread = async function(ctx){
    await ctx.render('spread/index');
};
