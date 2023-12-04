import axios from "axios";
const BASE_URL = "https://react-mini-projects-api.classbon.com";
// const BASE_URL = "https://jsonplaceholder.typicode.com";
export const httpService = axios.create({
    baseUrl: BASE_URL,
})