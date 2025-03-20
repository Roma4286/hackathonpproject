export type LoginDto = {
  password: string;
  username: User["username"];
};

export type User = {
  username: string;
  misinformation_level: number;
  pollution: number;
  trust_science: number;
  general_condition: "Bad" | "Normal" | "Excellent";
};

export type ApiError = {
  detail: string | unknown[];
};
