import axios, { TOKEN_KEY } from "./api.service";
import { UserState, User, Feedback, Role, Faculty } from "../types";
import { addLogs, eventType, eventSource } from "./logs.serivce";

const USER_KEY = "user";

class UserService {
  /**
   * @deprecated
   */
  public async login(username: string, password: string) {
    localStorage.removeItem(TOKEN_KEY);
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
    const response = await axios.post("api/login/token", formData, {
      withCredentials: true, // Equivalent to 'credentials: "include"'
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const userData = response.data as UserState;
    const access_token = userData.access_token;
    console.log(userData);
    if (access_token) localStorage.setItem(TOKEN_KEY, access_token);

    return userData;
  }

  public async register(email: string, displayName: string) {
    const nameParts: string[] = displayName.split(" ");

    let firstName: string = "",
      lastName: string = "";

    if (nameParts.length >= 2) {
      firstName = nameParts.slice(0, -1).join(" "); // Join all parts except the last one
      lastName = nameParts[nameParts.length - 1]; // Get the last part as the last name
    } else {
      // If there are not enough parts, assume the entire name is the first name
      firstName = displayName;
      lastName = "";
    }

    const authcate = email.split("@")[0];

    const user: User = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      authcate: authcate,
      monashObjectId: null,
      role: "Student" as Role,
      faculty: "Information Technology" as Faculty,
    };

    const response = await axios.post("api/user/create", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Registration successful", response.data);
  }

  public async checkUserExists(email: string) {
    const response = await axios.get(`api/user/${email}`);
    if (response.data != null) {
      return true;
    } else {
      return false;
    }
  }

  public async getUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    const response = await axios.get("api/login/verifyToken");
    const user = response.data as User;
    return { user: user, access_token: token } as UserState;
  }
  public async logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
  /**
   * @deprecated
   */
  public async registerOld(user: User) {
    const response = await axios.post("api/user/signup", user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.data as UserState;
  }

  public async getUserFeedbacks() {
    const response = await axios.get("api/feedback/all");
    console.log(response.data);

    return response.data as Feedback[];
  }
}
export default UserService;
