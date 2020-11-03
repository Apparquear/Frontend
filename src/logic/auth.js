import axios from "axios";

const ENDPOINT_PATH = "http://localhost:8080/apparquear/";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  register(name, password, email, age) {
    const user = { name, password, email, age };
    return axios.post(ENDPOINT_PATH + "user/save", user);
  },
  login(email, password){
    const user = {email, password};
    return axios.post(ENDPOINT_PATH + "user/login", user);
  },
  
  
};
