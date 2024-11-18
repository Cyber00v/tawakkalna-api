import { HttpResponse } from "../types";

export const Error = (message: string): HttpResponse => {
  return {
    message,
  };
};
