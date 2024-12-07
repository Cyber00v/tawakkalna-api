import { HttpMethod, HttpResponseReturnType } from "./types";
import generateSignHeader from "./utils/generate-signed-header";
import isEmptyObject from "./utils/is-empty-object";

export interface HttpOptions {
  base: string;
  security?: { sharedSecret: string };
}

export interface Fetcher {
  fetch: (
    url: string,
    method: HttpMethod,
    headers: Record<string, string>,
    parameters: Record<string, any>
  ) => Promise<HttpResponseReturnType>;
}

export class HttpClient {
  private options: HttpOptions;
  private fetcher: Fetcher;

  constructor(options: HttpOptions, fetcher: Fetcher) {
    this.options = options;
    this.fetcher = fetcher;
  }

  public async get(
    path: string,
    parameters: Record<string, any>
  ): Promise<HttpResponseReturnType> {
    return this.execute(path, "GET", parameters);
  }

  public async post(
    path: string,
    parameters: Record<string, any>
  ): Promise<HttpResponseReturnType> {
    return this.execute(path, "POST", parameters);
  }

  public async delete(
    path: string,
    parameters: Record<string, any>
  ): Promise<HttpResponseReturnType> {
    return this.execute(path, "DELETE", parameters);
  }

  public async put(
    path: string,
    parameters: Record<string, any>
  ): Promise<HttpResponseReturnType> {
    return this.execute(path, "PUT", parameters);
  }

  public async execute(
    path: string,
    method: HttpMethod,
    parameters: Record<string, any>
  ): Promise<HttpResponseReturnType> {
    const url = `${this.options.base}${path}`;
    //set up HTTP headers to includes a digital signature
    const headers = this.options.security?.sharedSecret
      ? await generateSignHeader(
          url,
          method,
          isEmptyObject(parameters) ? "" : JSON.stringify(parameters),
          this.options.security.sharedSecret
        )
      : {};
    return this.fetcher.fetch(url, method, headers, parameters);
  }
}
