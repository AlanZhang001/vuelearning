import Vue from 'vue';
import Vuex from 'vuex';

import moduleA from '../store/modules/moduleA';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations,
    actions,
    modules: {
        a: moduleA
    }
});

export default store;
