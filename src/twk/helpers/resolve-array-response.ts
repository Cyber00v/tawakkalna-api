import { HttpResponseReturnType } from "../types";
import resolveSingleResponse from "./resolve-single-response";

const resolve = <T extends object>(
  entity: T,
  responses: HttpResponseReturnType[] | HttpResponseReturnType
): T => {
  if (Array.isArray(responses))
    for (const response of responses) resolveSingleResponse(entity, response);
  else resolveSingleResponse(entity, responses);

  return entity;
};
export default resolve;
