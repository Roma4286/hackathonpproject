import axiosCLient from "axios";
import { LoginDto, User } from "./auth.dto";

const axios = axiosCLient.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
  timeout: 5000,
  timeoutErrorMessage: "The request took too long to complete.",
});

class ApiClient {
  static async login({ username, password }: LoginDto) {
    await axios.post(
      "/token",
      { username, password },
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  }

  static async signup({ username, password }: LoginDto) {
    await axios.post("/auth/register", { username, password });
  }

  static async getUser() {
    return await axios.get<User>("/user", {
      headers: { Authorization: "Bearer undefined" },
    });
  }
}

export default ApiClient;
