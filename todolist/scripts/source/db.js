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
        return JSON.parse(localStorage.getItem(this.dbkey) || '[]');
    },

    /**
     * [save 保存一组todo Obect]
     * @param  {[Obejct]} todo [todo数组]
     * @return {[type]}        [description]
     */
    save(todoList){
        localStorage.setItem(this.dbkey,JSON.stringify(todoList));
    }
};

export default db;