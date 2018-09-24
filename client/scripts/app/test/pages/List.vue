<style></style>
<template>
<div>
    {{words}}
    <p>{{$store.state.a.count}}</p>
    <<button @click=""></button>
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
