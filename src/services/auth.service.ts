import axios from "./api.service";
import { TOKEN_KEY } from "./api.service";

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  monashId?: string;
}

export interface LoginResponse {
  user: {
    monashId: string;
    monashObjectId: string;
    authcate: string;
    email: string;
    lastName: string;
    firstName: string;
    role: string;
    faculty: string;
  };
  access_token: string;
}

export interface UserData {
  monashId: string;
  monashObjectId: string;
  authcate: string;
  email: string;
  lastName: string;
  firstName: string;
  role: string;
  faculty: string;
}

class AuthService {
  public async register(data: RegisterData) {
    try {
      const response = await axios.post("/api/user/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        throw new Error("User already exists");
      } else if (error.response?.status === 400) {
        throw new Error("Email and password are required");
      }
      throw error;
    }
  }

  public async login(email: string, password: string): Promise<LoginResponse> {
    localStorage.removeItem(TOKEN_KEY);

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await axios.post("/api/login/token", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const data = response.data as LoginResponse;

      if (data.access_token) {
        localStorage.setItem(TOKEN_KEY, `Bearer ${data.access_token}`);
      }

      return data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("Invalid email or password");
      }
      throw error;
    }
  }

  public async verifyToken(): Promise<UserData> {
    const response = await axios.get("/api/login/verifyToken");
    return response.data;
  }

  public async refreshToken(token: string): Promise<{ access_token: string }> {
    const response = await axios.post("/api/login/refreshToken", { token }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.access_token) {
      localStorage.setItem(TOKEN_KEY, `Bearer ${response.data.access_token}`);
    }

    return response.data;
  }

  public async logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("user");
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
}

export default new AuthService();