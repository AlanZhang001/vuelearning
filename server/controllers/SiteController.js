let SiteController = exports;

SiteController.test = async function(ctx){
    await ctx.render('test/index');
};
