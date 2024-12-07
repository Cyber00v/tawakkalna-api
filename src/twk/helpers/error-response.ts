import { HttpResponseReturnType } from "../types";

export const Error = (message: string): HttpResponseReturnType => {
  return {
    message,
  };
};
