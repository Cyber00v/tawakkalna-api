import hasProperty from "../guard/has-property";
import isFileResponse from "../guard/is-file-response";
import isSuccefulResponse from "../guard/is-succeful-response";
import {
  HttpResponseReturnType,
  Media,
  TawakkalnaEntity,
  TawakkalnaEntityEnum,
} from "../types";
import snakeToCamel from "../utils/snake-to-camel";
import isEqual from "../guard/is-equal";
import objectEntries from "../utils/object-entries";
import isKeyof from "../guard/is-keyof";

const parser = (text: string) => {
  function reviver(this: any, key: string, value: any) {
    const camelKye = snakeToCamel(key);

    if (key == camelKye) return value;

    this[camelKye] = value;
  }
  return JSON.parse(text, reviver);
};

export const parseEntity = <
  T extends TawakkalnaEntity,
  R extends HttpResponseReturnType
>(
  entity: T,
  response: R
): TawakkalnaEntity | undefined => {
  if (isFileResponse(response)) {
    if (!entity.files) entity.files = [];
    entity.files.push({ base64: response.content as string });
    return entity;
  }

  if (isSuccefulResponse(response)) {
    const obj = parser(response.data as string);

    if (Array.isArray(obj)) {
      if (!obj.length) return;

      if (hasProperty(obj[0], "type") && isEqual("image", obj[0].type)) {
        if (!entity.images) entity.images = [];
        for (let index = 0; index < obj.length; index++) {
          const media: Media = {
            ...obj[index],
          };

          entity.images.push(media);
        }
      } else if (hasProperty(obj[0], "type") && isEqual("video", obj[0].type)) {
        if (!entity.videos) entity.videos = [];
        for (let index = 0; index < obj.length; index++) {
          const media: Media = {
            ...obj[index],
          };

          entity.videos.push(media);
        }
      }
    }
    //for file object
    else if (hasProperty(obj, "type") && obj["type"] == "file") {
      if (!entity.documents) entity.documents = [];
      const media: Media = {
        ...obj,
      };

      entity.documents.push(media);
    } else {
      for (const [key, value] of objectEntries(obj)) {
        if (isKeyof(key, TawakkalnaEntityEnum)) entity[key] = value;
      }
    }
  }
  return entity;
};
