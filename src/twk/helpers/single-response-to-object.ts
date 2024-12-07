// import hasProperty from "../guard/has-property";
// import isEqual from "../guard/is-equal";
import isFileResponse from "../guard/is-file-response";
import isString from "../guard/is-string";
import isSuccefulResponse from "../guard/is-succeful-response";
import { HttpResponseReturnType } from "../types";

const singleResponseToObject = (response: HttpResponseReturnType) => {
  // file response

  if (isFileResponse(response)) {
    //tawakkalna return base64string with getRawData endpoint
    return response.content;
  }

  //succesful response with data
  if (isSuccefulResponse(response)) {
    if (!isString(response.data)) return response.data;

    const json = JSON.parse(response.data);

    return json;
  }
  //unkown
  return {}; //return empty object
};
export default singleResponseToObject;
