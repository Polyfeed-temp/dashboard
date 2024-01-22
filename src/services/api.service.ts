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
const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1]; // Get the payload part of the token
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe base64 encoding characters
        const payload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const jwtPayload = JSON.parse(payload);
        return jwtPayload
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};
const isTokenExpired = async () => {
    const token = localStorage.getItem(TOKEN_KEY) as string;

    const decoded = decodeJWT(token)
    if (decoded) {
        console.log(decoded.exp, Date.now() / 1000)
        return decoded.exp < Date.now() / 1000
    }
}

const refreshToken = async () => {
    const response = await axios.get("/api/login/refreshToken") as { access_token: string }
    const access_token = response.access_token
    localStorage.setItem(TOKEN_KEY, access_token)
}

axios.interceptors.response.use(async (response) => {
    const expired = await isTokenExpired();
    if (expired) {
        await refreshToken();
    }
    return response;
});


export default commonAxios;

