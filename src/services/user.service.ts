import axios, { TOKEN_KEY } from "./api.service"
import { UserState, User, Feedback } from "../types";

const USER_KEY = "user";
class UserService {


    public async login(username: string, password: string) {
        localStorage.removeItem(TOKEN_KEY);
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);
        const response = await axios.post("api/login/token", formData, {
            withCredentials: true, // Equivalent to 'credentials: "include"'
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const userData = response.data as UserState
        const access_token = userData.access_token;
        console.log(userData)
        if (access_token)
            localStorage.setItem(TOKEN_KEY, access_token)


        return userData

    }

    public async getUser() {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await axios.get("api/login/verifyToken");
        const user = response.data as User
        return { user: user, access_token: token } as UserState


    }
    public async logout() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    }

    public async register(user: User) {
        const response = await axios.post("api/user/signup", user, { withCredentials: true, headers: { 'Content-Type': 'application/json', "Authorization": 'Bearer ' + localStorage.getItem('token') }, });
        return response.data as UserState

    }

    public async getUserFeedbacks() {
        const response = await axios.get("api/feedback/all");

        return response.data as Feedback[]
    }


}
export default UserService;