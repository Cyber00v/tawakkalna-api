import type { HttpMethod, HttpResponseReturnType } from "./types";
import { Error, OK } from "./helpers";
import { Fetcher } from "./http-client";
import formatHeaders from "./utils/format-header";
import isRequestBody from "./guard/is-request-body";
export class xhr implements Fetcher {
  constructor() {}
  public async fetch(
    url: string,
    method: HttpMethod,
    headers: Record<string, string>,
    parameters: Record<string, any> | XMLHttpRequestBodyInit
  ): Promise<HttpResponseReturnType> {
    const instance = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      instance.ontimeout = function () {
        reject(Error("timeout"));
      };

      instance.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          resolve(xhr.getHttpResponse(instance));
        }
      };

      instance.responseType = "arraybuffer";
      instance.open(method, url, true);

      formatHeaders(headers).forEach((header) =>
        instance.setRequestHeader(header.name, header.value)
      );

      if (method !== "GET")
        if (isRequestBody(parameters)) instance.send(parameters);
        else instance.send(JSON.stringify(parameters));
      else instance.send();
    });
  }

  private static getHttpResponse = (
    httpRequest: XMLHttpRequest
  ): HttpResponseReturnType => {
    if (httpRequest.readyState != XMLHttpRequest.DONE)
      return Error(
        "The HTTP request must complete before a response can be received"
      );

    const buffer = httpRequest.response as ArrayBuffer;

    if (httpRequest.status === 200) return OK(buffer);
    else return Error(`Request failed with status code: ${httpRequest.status}`);
  };
}
export default new xhr();
