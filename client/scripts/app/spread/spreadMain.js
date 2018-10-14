/**
 * testDemo
 *
 */

import ElementUI from 'element-ui';
import Vue from 'vue';
import service from './service';
import * as filters from './../filters';

Vue.filter('dateformater',filters.formatDate);



// 尽量靠后
Vue.use(ElementUI);

new Vue({
    el: '#app',

    data: function() {
        return {
            name: '',
            loading: false,
            data: {
                list: [],
                isFromCache: true,
                message: ''
            },
            timer: null
        };
    },
    methods: {

        search: function() {
            if (!this.name || this.loading) {
                return;
            }

            this.data.list = [];
            this.showLoading();
            service.getDoc(this.name).then((res) => {

                this.renderList(res.data);
                this.hideLoading();

            }).catch((e) => {
                this.error(e);
                this.hideLoading();
            });
        },
        showLoading: function() {
            this.loading = true;
        },
        hideLoading: function() {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.loading = false;
            }, 600);
        },
        renderList: function(res) {
            this.data.list = res.data.list;
            this.data.isFromCache = res.data.isFromCache;
            this.data.message = res.message;
        },
        error: function(e) {

            this.data.message = e.message;
            console.log(this.data);
        }
    }
});