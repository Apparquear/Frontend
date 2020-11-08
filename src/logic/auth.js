import axios from "axios";

const ENDPOINT_PATH = "http://localhost:8080/apparquear/";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default {
  register(name, password, email, age) {
    const user = { name, password, email, age };
    return axios.post(ENDPOINT_PATH + "user/save", user);
  },
  login(email, password) {
    const user = { email, password };
    return axios.post(ENDPOINT_PATH + "user/login", user);
  },
  parking_register(
    parking_name,
    latitude,
    longitude,
    opening_time,
    closing_time,
    car_spaces,
    motorcycle_spaces,
    bike_spaces,
    car_cost_minute,
    motorcycle_cost_minute,
    bike_cost_minute,
    user_id,
    token
  ) {
    const parking = {
      parking_name,
      latitude,
      longitude,
      opening_time,
      closing_time,
      car_spaces,
      motorcycle_spaces,
      bike_spaces,
      car_cost_minute,
      motorcycle_cost_minute,
      bike_cost_minute
    };
    return axios.post(ENDPOINT_PATH + "parking/save/" + user_id + "/" + token , parking);
  },
  invalidate_token(token){
    const body = {
      token
    }
    return axios.post(ENDPOINT_PATH + "token/invalidate", body);
  },
  nearByParking(bounds){
    const body = [{"locationID": "1","parkingID": "1", "latitude": bounds[0][0],"longitude": bounds[0][1]},
    {"locationID": "1","parkingID": "1", "latitude": bounds[1][0],"longitude": bounds[1][1]}]   
    return axios.get(ENDPOINT_PATH + "parking/findRange", bounds);
  },
};
