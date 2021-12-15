import axios from "axios";

export default axios.create({
  baseURL: "https://mern-begin.herokuapp.com/api/v1/foods/",
  headers: {
    "Content-type": "application/json"
  }
});


