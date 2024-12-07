import { HttpResponseReturnType, SuccessResponse } from "../types";

export default (value: HttpResponseReturnType): value is SuccessResponse =>
  "data" in value;
