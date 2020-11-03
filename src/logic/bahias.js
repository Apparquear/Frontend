import axios from "axios";

const ENDPOINT_PATH = "http://localhost:8080/apparquear/";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default {
  
  bahias(idparking){
    return axios.get(ENDPOINT_PATH + "cupos/" + idparking);
  }
};
