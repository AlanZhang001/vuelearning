/**
 * testDemo
 *
 */

import ElementUI from 'element-ui';
import Vue from 'vue';
import service from './service';
Vue.use(ElementUI);

new Vue({
    el: '#app',

    data: function () {
        return {
            name: '',
            loading:false,
            list: {
                data: [],
                message: ''
            },
            timer: null
        };
    },
    methods: {

        search: function () {
            if (!this.name || this.loading) {
                return;
            }
    
            this.list.data = [];
            this.showLoading();
            service.getDoc(this.name).then((res) => {
             
                this.renderList(res.data);
                this.hideLoading();
           
            }).catch((e) => {
                this.error(e);
                this.hideLoading();
            });
        },
        showLoading:function(){
            this.loading = true;
        },  
        hideLoading: function(){
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.loading = false;
            },600);
        },  
        renderList: function (res) {
            this.list = res;
        },
        error: function (e) {
            this.list.message = e.message;
        }
    }
});
