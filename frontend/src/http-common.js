import axios from "axios";

export default axios.create({
  baseURL: "https://restaurantrev.herokuapp.com/api/v1/foods/",
  headers: {
    "Content-type": "application/json"
  }
});


