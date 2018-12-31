/**
 * testDemo
 *
 */
import quicklink from 'quicklink/dist/quicklink.mjs';

import ElementUI from 'element-ui';
import Vue from 'vue';
import service from './service';
import * as filters from './../filters';
import ClipboardJS from 'clipboard';
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
                sourceSite:'',
                isFromCache: true,
                message: ''
            },
            timer: null,
            multipleSelection:[],
            dlList:[],
            canDownLoad: false,
            increament:0,
            showBatchRes : false,
            batchsearching: false
        };
    },
    mounted() {
        new ClipboardJS('#copyurl', {
            text: (trigger)=>{
                return this.dlList.join('\n');
            }
        });

        quicklink({
            urls: [
                'https://static.futunn.com/act/images/activity/tencent-music-vip/top-397b32371627a2307be834b6d76865dd.jpg',
                'hhttps://static.futunn.com/act/images/common/topLogo-26780403448d5866f37d25356bab620e.svg'
            ]
        });
    },
    methods: {

        search: function() {
            if (!this.name || this.loading) {
                return;
            }

            this.data.list = [];
            this.showLoading();
            service.getDoc(this.name).then((res) => {

                this.renderList(res);
                this.hideLoading(res.data.list.length > 0 ? 0 : undefined);

            }).catch((e) => {
                this.error(e);
                this.hideLoading(0);
            });
        },
        showLoading: function() {
            this.loading = true;
        },
        hideLoading: function(timerCount = 600) {
            this.timer && clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.loading = false;
            },timerCount);
        },
        renderList: function(res) {
            this.data.list = res.data.list;
            this.data.sourceSite = res.data.sourceSite;
            this.data.isFromCache = res.data.isFromCache;
            this.data.message = res.message;
        },
        error: function(e) {
            this.data.message = e.message;
        },
        handleSelectionChange(arr) {
            this.multipleSelection = arr;
            this.dlList = [];
            this.multipleSelection.forEach(item=>{
                this.dlList.push(item.dl);
            });
            return this.dlList;
        },
        searchBatch(){
            this.showLoading();
            service.getDocAuto().then(res=>{
                this.increament = res.data.list.length;
                this.showLoading();
            }).catch(err=>{
                this.error(err);
                this.hideLoading();
            });
        },
        saveToBaiduYun: function(){
            this.canDownLoad && console.log(this.dlList);
        }
    },
    watch:{
        multipleSelection: {
            deep:true,
            handler:function(){
                this.canDownLoad = Boolean(this.multipleSelection.length > 0);
            }
        }
    }
});
