import { HttpResponseReturnType, TawakkalnaEntity } from "../types";
import { parseEntity } from "./parse-entity";

const resolveSingleResponse = (
  entity: TawakkalnaEntity,
  response: HttpResponseReturnType
) => {
  return parseEntity(entity, response);
};

export default resolveSingleResponse;
