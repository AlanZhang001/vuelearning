<style></style>
<template>
<div>
    {{words}}
    <p>{{$store.state.a.count}}</p>
    <button @click="$store.commit('increment')">加1</button>
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
