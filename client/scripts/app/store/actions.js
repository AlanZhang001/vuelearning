export default {
    incrementIfOddOnRootSum({
        state,
        commit,
        rootState
    }) {
        if ((state.count + rootState.count) % 2 === 1) {
            commit('increment');
        }
    }
};
