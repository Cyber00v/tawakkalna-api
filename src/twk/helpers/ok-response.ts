import { HttpResponseReturnType, JsonString } from "../types";

export const OK = (
  data: JsonString | Blob | Document | object | ArrayBuffer
): HttpResponseReturnType => {
  return {
    data,
  };
};
