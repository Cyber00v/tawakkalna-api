import { HttpResponseReturnType } from "../types";
import singleResponseToObject from "./single-response-to-object";

const toObject = (responses: HttpResponseReturnType[]) => {
  const result = {} as Record<string, any>;
  const length = responses.length;

  for (let index = 0; index < length; index++)
    Object.assign(result, {
      [index]: singleResponseToObject(responses[index]),
    });

  return result;
};
export default toObject;
