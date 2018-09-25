const moduleA = {
    namespaced: true,
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            // 这里的 `state` 对象是模块的局部状态
            state.count++;
        }
    },

    getters: {
        doubleCount(state) {
            return state.count * 2;
        },
        sumWithRootCount(state, getters, rootState,rootGetters) {
            return state.count + rootState.count;
        }
    },
    actions: {
        incrementIfOddOnRootSum({
            state,
            commit,
            rootState
        }) {
            if ((state.count + rootState.count) % 2 === 1) {
                commit('increment');
            }
        }
    }
};

export default moduleA;
