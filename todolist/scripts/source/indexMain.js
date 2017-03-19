/**
 * overview：todomvc的实现
 * date：2017-03-12
 */
require('../../css/source/index.css');

import Vue from 'vue';
import DB from './DB';

let todoList = new Vue({
    el:'#todoContainer',
    data:{
        // model对应新输入的todo
        todo:'',

        // 输入框palceholder
        placeholder:'接下俩做点什么',

        // 数据库保存的todo
        todolist: DB.fetch(),

        // todo的状态
        STATUS : {
            ALL:'all',
            ACTIVE:'active',
            COMPLETED:'completed'
        },

        alldone:false,

        // 初始筛选的状态
        filterStaus: 'all'
    },
    methods: {
        /**
         * [addNewTodo 保存新的todo]
         */
        addNewTodo(){
            let content = String(this.todo);
            if (content.length === 0) {
                return;
            }

            let doto = {
                content: content,
                status: this.STATUS.ACTIVE,
                // 这个参数加的有点尴尬，主要是为了给input设置值
                isCompleted:false
            };

            this.todolist.unshift(doto);
            this.todo = '';
        },

        /**
         * [doneTodo 完成某条todo]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        doneTodo: function(index){
            this.todolist[index].status = this.STATUS.COMPLETED;
            this.todolist[index].isCompleted = true;
        },

        /**
         * [deleteTodo 删除某条记录]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        deleteTodo(index){
            this.todolist.splice(index,1);
        },

        /**
         * [delteCompleted 删除全部以完成]
         * @return {[type]} [description]
         */
        delteCompleted(){
            this.todolist = this.todolist.filter(item => {
                return item.status != this.STATUS.COMPLETED;
            });
        }
    },
    computed:{
        /**
         * [filterList 筛选出出来的列表]
         */
        filterList() {

            if (this.filterStaus === this.STATUS.ALL){
                return this.todolist;
            }

            return this.todolist.filter(item => {
                return item.status === this.filterStaus;
            });

        },

        /**
         * [remains 未完成的个数]
         * @return {[type]} [description]
         */
        remains(){
            return this.todolist.length;
        },

        alldoneTitle(){
            return  this.alldone ? '全标记为未完成' :'全部标记为已完成';
        }
    },
    watch:{
        /**
         * [todolist todolist做watch，发生数据变更则将数据保存,包括数据的增减，某条数据的状态的改变]
         * @type {Object}
         */
        todolist: {
            deep: true,
            handler: function(){
                DB.save(this.todolist);
            }
        },

        /**
         * [alldone 是否选择全部完成]
         * @type {Object}
         */
        alldone: {
            handler: function(val,oldval) {

                let status = val ? this.STATUS.COMPLETED : this.STATUS.ACTIVE;
                let isCompleted = val;
                this.todolist.forEach(item=>{
                    item.status = status;
                    item.isCompleted = isCompleted;
                });
            }
        }
    }
});