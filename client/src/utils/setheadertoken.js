import axios from 'axios';

const setAuthToken  = token => {
    //console.log('checking token',token)
    if(token)
    {
        
        axios.defaults.headers.common['myjwttoken'] = token;
    }
    else {
        delete axios.defaults.headers.common['myjwttoken'];
    }
};
export default setAuthToken; 