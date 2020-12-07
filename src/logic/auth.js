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
    userID,
    token
  ) {
    const parking = {
      parking_name,
      opening_time,
      closing_time,
      car_spaces,
      motorcycle_spaces,
      bike_spaces,
      car_cost_minute,
      motorcycle_cost_minute,
      bike_cost_minute
    };
    return axios.post(
      ENDPOINT_PATH + "parking/save/" + userID + "/" + token + "/" + latitude + "/" + longitude,
      parking
    );
  },
  invalidate_token(token) {
    const body = {
      token
    };
    return axios.post(ENDPOINT_PATH + "token/invalidate", body);
  },
  nearByParking(bounds) {
    let latitude, longitude;
    latitude = bounds._southWest.lat;
    longitude = bounds._southWest.lng;
    let southWest = { latitude, longitude };
    latitude = bounds._northEast.lat;
    longitude = bounds._northEast.lng;
    let northEast = { latitude, longitude };
    const body = { southWest, northEast };
    return axios.post(ENDPOINT_PATH + "parking/findRange", body);
  },
  reserva(
    reservation_time,
    final_time,
    vehicle_type,
    userID,
    token,
    parkingID,
  ) {
    const reserva = {
      reservation_time,
      final_time,
      vehicle_type,
    };

    return axios.post(ENDPOINT_PATH + "reservation/save/" + userID + "/" + parkingID + "/" + token , reserva);
  },
  reservationsByUser(User_id){
    User_id = User_id.toString();
    return axios.get(ENDPOINT_PATH + "reservation/findByUser/" + User_id);
  }
};
