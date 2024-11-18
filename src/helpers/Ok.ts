import { HttpResponse, JsonString } from "../types";

export const OK = (
  data: JsonString | Blob | Document | object | ArrayBuffer
): HttpResponse => {
  return {
    data,
  };
};
