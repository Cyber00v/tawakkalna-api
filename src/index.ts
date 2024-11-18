import { HttpClient } from "./HttpClient";
import TawakkalnaApi from "./TawakkalnaApi";
import xhr from "./xhr";

const http: HttpClient = new HttpClient(
  { base: TWKAPIBASE, security: { sharedSecret: SHAREDSECRET } },
  xhr
);
const api = new TawakkalnaApi(http);

export default api;
