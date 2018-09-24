/**
 * testDemo
 *
 */


import Vue from 'vue';
import Vuex from 'vuex'
import VueRouter from 'vue-router';

const View = () => import ('./pages/View.vue');
const List = () => import ('./pages/List.vue');

Vue.use(Vuex);
Vue.use(VueRouter);

const moduleA = {
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++
        }
    },

    getters: {
        doubleCount(state) {
            return state.count * 2
        },
        sumWithRootCount(state, getters, rootState) {
            return state.count + rootState.count
        }
    },
    actions: {
        incrementIfOddOnRootSum({
            state,
            commit,
            rootState
        }) {
            if ((state.count + rootState.count) % 2 === 1) {
                commit('increment')
            }
        }
    }
};

const store = new Vuex.Store({
    strict: true,
    modules: {
        a: moduleA
    }
});


var router = new VueRouter({
    mode: 'history',
    base: '/test',
    routes: [{
        path: '/',
        redirect: '/list'
    }, {
        path: '/view',
        component: View
    }, , {
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
