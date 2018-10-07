module.exports = {
    root: true,
    env: {
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    extends: ['futu','plugin:vue/essential'],
    rules:{
        "semi": ["error", "always"],
        "no-console": 0
    }
};
