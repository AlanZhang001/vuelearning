export default{
    doubleCount(state) {
        return state.count * 2;
    },
    sumWithRootCount(state, getters, rootState) {
        return state.count;
    }
};
