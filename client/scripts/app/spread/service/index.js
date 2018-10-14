const axios = require('axios');
export default {
    getDoc: function(name){
        return axios.get(`/api/getdoc/${name}`,{
            name
        }).then(function(response){
            return response.data;
        });
    }
};
