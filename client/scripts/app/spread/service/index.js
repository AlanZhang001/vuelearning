const axios = require('axios');
export default {
    getDoc: function(name){
        return axios.get(`/api/getdoc/${name}`,{
            name
        }).then(function(response){
            return response.data;
        });
    },
    getDocAuto: function(){
        return axios.get('/api/batch').then(function(response){
            return response.data;
        });
    }
};
