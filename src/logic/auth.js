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
    bike_cost_minute
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
    return axios.post(ENDPOINT_PATH + "parking/save", parking);
  }
};
