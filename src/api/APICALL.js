import axios from "axios";

export default axios.create({
    baseURL: `https://paw-online-queue-api.herokuapp.com`
})