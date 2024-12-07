import { ErrorResponse, HttpResponseReturnType } from "../types";

export default (value: HttpResponseReturnType): value is ErrorResponse =>
  "message" in value;
