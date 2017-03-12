/**
 * overview：用于存取todolist的数据
 * date: 2017/03/12
 */

var db = {
    dbkey:'todolist-vue2',

    /**
     * [fetch 获取保存的数据]
     * @type {[type]}
     */
    fetch(){
        return JSON.parseJSON(localStorage.getItem(this.dbkey) || '[]');
    },

    /**
     * [save 保存某条todo数据]
     * @param  {[type]} todo [某条todolist的状态]
     * @return {[type]}      [description]
     */
    save(todo){

    }
};

export default db;