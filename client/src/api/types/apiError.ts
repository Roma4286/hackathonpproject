import { AxiosError } from "axios";

export type RawApiError = {
  detail: string | unknown[];
};

export type AxiosApiError = AxiosError<RawApiError>;
