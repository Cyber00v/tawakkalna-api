import type { HttpMethod, HttpResponse } from "./types";
import { Error, OK } from "./helpers";
import { Fetcher } from "./HttpClient";
import formatHeaders from "./utils/format-header";

export class xhr implements Fetcher {
  constructor() {}
  public async fetch(
    url: string,
    method: HttpMethod,
    headers: Record<string, string>,
    parameters: Record<string, any>
  ): Promise<HttpResponse> {
    const instance = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      instance.ontimeout = () => {
        reject(Error("timeout"));
      };

      instance.onreadystatechange = () => {
        if (instance.readyState === XMLHttpRequest.DONE) {
          resolve(this.getHttpResponse(instance));
        }
      };

      //"arraybuffer" | "blob" | "document" | "json" | "text";
      instance.responseType = "arraybuffer";
      instance.open(method, url);

      formatHeaders(headers).forEach((header) =>
        instance.setRequestHeader(header.name, header.value)
      );
      if (method != "GET") instance.send(JSON.stringify(parameters));
      else instance.send();
    });
  }

  private getHttpResponse = (httpRequest: XMLHttpRequest): HttpResponse => {
    if (httpRequest.readyState != XMLHttpRequest.DONE)
      return Error(
        "The HTTP request must complete before a response can be received"
      );

    //add type guard here
    const buffer = httpRequest.response as ArrayBuffer;

    if (httpRequest.status === 200) return OK(buffer);
    else return Error(`Request failed with status code: ${httpRequest.status}`);
  };
}
export default new xhr();
