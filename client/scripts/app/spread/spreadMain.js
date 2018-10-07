/**
 * testDemo
 *
 */


import Vue from 'vue';
import service from './service';

new Vue({
    el: '#app',

    data: function() {
        return {
            name:'',
            list: null
        };
    },
    methods:{
        search: function(){
            if(!this.name){
                return;
            }

            service.getDoc(this.name).then((res)=>{
                this.renderList(res.data);
            }).catch((e)=>{
                this.error(e);
            });
        },
        renderList: function(res){
            this.list = res;
        },
        error: function(e){
            console.log(e);
        }
    }
});
