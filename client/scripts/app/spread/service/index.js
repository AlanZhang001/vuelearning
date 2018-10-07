const axios = require('axios');
export default {
    getDoc: function(name){
        return axios.get(`/api/getdoc/${name}`,{
            name
        });
    }
};
