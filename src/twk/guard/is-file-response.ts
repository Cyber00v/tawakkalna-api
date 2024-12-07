import { FileResponse, HttpResponseReturnType } from "../types";

export default (value: HttpResponseReturnType): value is FileResponse =>
  "content" in value;
