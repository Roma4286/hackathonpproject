import { User } from "./responses";

export type LoginDto = {
  password: string;
  username: User["username"];
};
