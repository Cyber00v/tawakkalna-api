import type { HttpResponseReturnType } from "./types";

export interface HttpResponse {
  fromArray: (
    response: HttpResponseReturnType[]
  ) => object | Record<string, object>;
}
