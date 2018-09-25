<style></style>
<template>
<div>
    {{words}}
    <p>{{$store.state.a.count}}</p>
    <p>{{$store.getters['a/sumWithRootCount']}}</p>
    <button @click="$store.commit('a/increment')">加1</button>
</div>
</template>
<script>
export default {
    data: function(){
        return {
            words:'hello list'
        };
    }
};
</script>
