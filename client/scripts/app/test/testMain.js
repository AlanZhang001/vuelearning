/**
 * testDemo
 *
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

const View = () => import ('./pages/View.vue');

Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    base: '/views/test.html',
    routes: [{
        path: '/',
        redirect: '/view'
    },{
        path: '/view',
        component: View
    }]
});

new Vue({
    el: '#app',
    router: router,
    data: function() {
        return {
        };
    },
});
