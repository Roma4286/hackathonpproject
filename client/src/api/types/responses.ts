export type News = {
  news_id: number;
  name: string;
  text: string;
};

export type User = {
  username: string;
  misinformation_level: number;
  pollution: number;
  trust_science: number;
  general_condition: "Bad" | "Normal" | "Excellent";
};

export type CheckAnswerResponse = {
  message: string;
};
