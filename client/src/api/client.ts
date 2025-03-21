import axiosCLient from "axios";
import { LoginDto } from "./types/auth.dto";
import { User, News } from "./types/responses";

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
    const res = await axios.get<{ data: User }>("/user", {
      headers: { Authorization: "Bearer undefined" },
    });

    return res.data.data;
  }

  static async getRandomNews() {
    const res = await axios.get<{ data: News }>("/game/random_news");
    return res.data.data;
  }
}

export default ApiClient;
