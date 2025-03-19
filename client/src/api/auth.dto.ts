export type LoginDto = {
  password: string;
  username: User["username"];
};

export type User = {
  username: string;
};

export type ApiError = {
  detail: string | unknown[];
};
