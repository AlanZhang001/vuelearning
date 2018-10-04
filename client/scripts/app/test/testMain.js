/**
 * testDemo
 *
 */


import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

const View = () => import ('./pages/View.vue');
const List = () => import ('./pages/List.vue');

Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    base: '/test',
    routes: [{
        path: '/',
        redirect: '/list'
    }, {
        path: '/view',
        component: View
    }, {
        path: '/list',
        component: List
    }]
});

new Vue({
    el: '#app',
    store: store,
    router: router,
    data: function() {
        return {};
    },
});
