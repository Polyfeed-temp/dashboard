import axios from "axios";
import config from "../config.json";
export const TOKEN_KEY = "token";

const commonAxios = axios.create({
    baseURL: config.backend,
});
commonAxios.interceptors.request.use(async (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
}
);

export default commonAxios;

