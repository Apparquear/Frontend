import axios from "axios";

const ENDPOINT_PATH = "http://localhost:8081/apparquear/user/";



export default {
  register(user_name,user_password,user_email,user_age) {
    const user = { user_name,user_password,user_email,user_age };
    return axios.post(ENDPOINT_PATH + "save", user);
  }
    };