import axios from "axios";

const instance = axios.create({
  baseURL: "https://krushiganudenulk.firebaseio.com/",
});

export default instance;
