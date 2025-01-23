// src/twk/utils/pad-start.ts
var pad_start_default = (str, targetLength, padString = " ") => {
  if (str.length >= targetLength) return str;
  const padLength = targetLength - str.length;
  const paddedString = padString.repeat(padLength) + str;
  return paddedString;
};

// src/twk/utils/base64-encoder.ts
var base64Encoder = {
  fromBuffer: (arrayBuffer) => {
    const hex = Array.from(new Uint8Array(arrayBuffer))
      .map((byte) => pad_start_default(byte.toString(16), 2, "0"))
      .join("");
    return btoa(hex);
  },
  fromRawData: async (bytes) => {
    return new Promise((resolve2, reject) => {
      const blob = new Blob([bytes]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result || "";
        const [_, base64] = dataUrl.split(",");
        return resolve2(base64);
      };
      reader.onerror = () => reject("Error occurred reading file");
      reader.readAsDataURL(blob);
    });
  },
};
var base64_encoder_default = base64Encoder;

// src/twk/utils/subtle-crypto.ts
var subtleCrypto = {
  sign: async (
    message,
    key,
    algorithm = {
      name: "HMAC",
      hash: { name: "SHA-256" },
    }
  ) => {
    try {
      const encoder = new TextEncoder();
      const encodedKey = encoder.encode(key);
      const encodedMessage = encoder.encode(message);
      const keyBuffer = await crypto.subtle.importKey(
        "raw",
        encodedKey,
        algorithm,
        false,
        ["sign"]
      );
      const signatureBuffer = await crypto.subtle.sign(
        algorithm.name,
        keyBuffer,
        encodedMessage
      );
      return base64_encoder_default.fromBuffer(signatureBuffer);
    } catch (error) {
      console.error("Error calculating HMAC:", error);
      return null;
    }
  },
  digest: async (message, algorithm = "SHA-256") => {
    const buffer = new TextEncoder().encode(message);
    return await crypto.subtle.digest(algorithm, buffer).then(function (hash) {
      return base64_encoder_default.fromBuffer(hash);
    });
  },
};
var subtle_crypto_default = subtleCrypto;

// src/twk/utils/object-entries.ts
var object_entries_default = (object) => {
  const entries = [];
  for (const key in object)
    if (Object.prototype.hasOwnProperty.call(object, key))
      entries.push([key, object[key]]);
  return entries;
};

// src/twk/utils/generate-signed-header.ts
var generate_signed_header_default = (
  path,
  method,
  messageBody,
  SHAREDSECRET2
) => {
  return new Promise((resolve2) => {
    subtle_crypto_default.digest(messageBody).then((digest) => {
      let requestTarget = `${method.toLowerCase()} ${path}`;
      const headers = {
        Digest: `SHA-256=${digest}`,
        "Date-Time": /* @__PURE__ */ new Date().toUTCString(),
        "Host-Name": "localhost",
        "Request-Target": requestTarget,
      };
      var signatureParams = "";
      for (const [key, value] of object_entries_default(headers))
        signatureParams += `${key}: ${value},`;
      subtle_crypto_default
        .sign(signatureParams, SHAREDSECRET2)
        .then((signature) => {
          let sigend_headers = Object.keys(headers);
          headers[
            "Signature"
          ] = `Signature: algorithm="HMAC-SHA256",headers="${sigend_headers}",signature="${signature}"`;
          resolve2(headers);
        });
    });
  });
};

// src/twk/utils/is-empty-object.ts
var is_empty_object_default = (object) => Object.keys(object).length == 0;

// src/twk/http-client.ts
var HttpClient = class {
  constructor(options, fetcher) {
    this.options = options;
    this.fetcher = fetcher;
  }
  async get(path, parameters) {
    return this.execute(path, "GET", parameters);
  }
  async post(path, parameters) {
    return this.execute(path, "POST", parameters);
  }
  async delete(path, parameters) {
    return this.execute(path, "DELETE", parameters);
  }
  async put(path, parameters) {
    return this.execute(path, "PUT", parameters);
  }
  async execute(path, method, parameters) {
    const url = `${this.options.base}${path}`;
    const headers = this.options.security?.sharedSecret
      ? await generate_signed_header_default(
          url,
          method,
          is_empty_object_default(parameters) ? "" : JSON.stringify(parameters),
          this.options.security.sharedSecret
        )
      : {};
    return this.fetcher.fetch(url, method, headers, parameters);
  }
};

// src/twk/utils/array-enum.ts
var array_enum_default = (items) => {
  const obj = {};
  for (const item of items) {
    obj[item] = item;
  }
  return obj;
};

// src/twk/types/index.ts
var Gender = /* @__PURE__ */ ((Gender2) => {
  Gender2[(Gender2["male"] = 1)] = "male";
  Gender2[(Gender2["female"] = 2)] = "female";
  return Gender2;
})(Gender || {});
var MaritalStatus = /* @__PURE__ */ ((MaritalStatus2) => {
  MaritalStatus2["single"] = "single";
  MaritalStatus2["married"] = "married";
  return MaritalStatus2;
})(MaritalStatus || {});
var UserType = /* @__PURE__ */ ((UserType2) => {
  UserType2[(UserType2["citizen"] = 1)] = "citizen";
  UserType2[(UserType2["resident"] = 2)] = "resident";
  UserType2[(UserType2["visitor"] = 3)] = "visitor";
  UserType2[(UserType2[""] = 4)] = "";
  return UserType2;
})(UserType || {});
var BloodType = /* @__PURE__ */ ((BloodType2) => {
  BloodType2[(BloodType2["A+"] = 1)] = "A+";
  BloodType2[(BloodType2["A-"] = 2)] = "A-";
  BloodType2[(BloodType2["B+"] = 3)] = "B+";
  BloodType2[(BloodType2["B-"] = 4)] = "B-";
  BloodType2[(BloodType2["AB+"] = 5)] = "AB+";
  BloodType2[(BloodType2["AB-"] = 6)] = "AB-";
  BloodType2[(BloodType2["O-"] = 7)] = "O-";
  BloodType2[(BloodType2["O+"] = 8)] = "O+";
  return BloodType2;
})(BloodType || {});
var CardActionType = /* @__PURE__ */ ((CardActionType2) => {
  CardActionType2[(CardActionType2["Add"] = 1)] = "Add";
  CardActionType2[(CardActionType2["Update"] = 2)] = "Update";
  CardActionType2[(CardActionType2["Remove"] = 3)] = "Remove";
  return CardActionType2;
})(CardActionType || {});
var UrlType = /* @__PURE__ */ ((UrlType2) => {
  UrlType2[(UrlType2["http"] = 1)] = "http";
  UrlType2[(UrlType2["tel"] = 2)] = "tel";
  UrlType2[(UrlType2["mailTo"] = 3)] = "mailTo";
  UrlType2[(UrlType2["deepLink"] = 4)] = "deepLink";
  return UrlType2;
})(UrlType || {});
var TawakkalnaEntityEnum = array_enum_default([
  "token",
  "userId",
  "fullName",
  "fullNameEn",
  "fullNameAr",
  "userPhoto",
  "userType",
  "birthDate",
  "mobileNumber",
  "gender",
  "nationalityName",
  "nationalityIso",
  "maritalStatus",
  "bloodType",
  "degreeType",
  "occupation",
  "nationalAddresses",
  "sponsors",
  "familyMembers",
  "violations",
  "vehicles",
  "files",
  "deviceModel",
  "osVersion",
  "appearance",
  "appLanguage",
  "images",
  "videos",
  "documents",
  "idExpiryDateHijri",
  "idExpiryDateGregorian",
  "idType",
  "idTypeDescriptionAr",
  "idTypeDescriptionEn",
  "userPassports",
  "familyMembersPassports",
  "email",
  "nationalityCode",
  "nationalityNameAr",
  "nationalityNameEn",
  "documentType",
  "documentNumber",
]);

// src/twk/guard/has-property.ts
var has_property_default = (obj, prop) => prop in obj;

// src/twk/guard/is-file-response.ts
var is_file_response_default = (value) => "content" in value;

// src/twk/guard/is-succeful-response.ts
var is_succeful_response_default = (value) => "data" in value;

// src/twk/utils/snake-to-camel.ts
var IDENTIFIER = /(_+[a-z0-9])/g;
var replacer = (match) => match.toUpperCase().replace("_", "");
var snake_to_camel_default = (input) => input.replace(IDENTIFIER, replacer);

// src/twk/guard/is-equal.ts
var is_equal_default = (value, ...expectedvalue) =>
  expectedvalue.includes(value);

// src/twk/guard/is-keyof.ts
var is_keyof_default = (k, obj) => {
  return obj[k] !== void 0;
};

// src/twk/helpers/parse-entity.ts
var parser = (text) => {
  function reviver(key, value) {
    const camelKye = snake_to_camel_default(key);
    if (key == camelKye) return value;
    this[camelKye] = value;
  }
  return JSON.parse(text, reviver);
};
var parseEntity = (entity, response) => {
  if (is_file_response_default(response)) {
    if (!entity.files) entity.files = [];
    entity.files.push({ base64: response.content });
    return entity;
  }
  if (is_succeful_response_default(response)) {
    const obj = parser(response.data);
    if (Array.isArray(obj)) {
      if (!obj.length) return;
      if (
        has_property_default(obj[0], "type") &&
        is_equal_default("image", obj[0].type)
      ) {
        if (!entity.images) entity.images = [];
        for (let index = 0; index < obj.length; index++) {
          const media = {
            ...obj[index],
          };
          entity.images.push(media);
        }
      } else if (
        has_property_default(obj[0], "type") &&
        is_equal_default("video", obj[0].type)
      ) {
        if (!entity.videos) entity.videos = [];
        for (let index = 0; index < obj.length; index++) {
          const media = {
            ...obj[index],
          };
          entity.videos.push(media);
        }
      }
    } else if (has_property_default(obj, "type") && obj["type"] == "file") {
      if (!entity.documents) entity.documents = [];
      const media = {
        ...obj,
      };
      entity.documents.push(media);
    } else if (has_property_default(obj, "type") && obj["type"] == "image") {
      if (!entity.images) entity.images = [];
      const media = {
        ...obj,
      };
      entity.images.push(media);
    } else {
      for (const [key, value] of object_entries_default(obj)) {
        if (is_keyof_default(key, TawakkalnaEntityEnum)) entity[key] = value;
      }
    }
  }
  return entity;
};

// src/twk/helpers/resolve-single-response.ts
var resolveSingleResponse = (entity, response) => {
  return parseEntity(entity, response);
};
var resolve_single_response_default = resolveSingleResponse;

// src/twk/helpers/resolve-array-response.ts
var resolve = (entity, responses) => {
  if (Array.isArray(responses))
    for (const response of responses)
      resolve_single_response_default(entity, response);
  else resolve_single_response_default(entity, responses);
  return entity;
};
var resolve_array_response_default = resolve;

// src/twk/TawakkalnaApi.ts
var TawakkalnaApi = class {
  constructor(httpClient) {
    this.requestQueue = /* @__PURE__ */ new Map();
    this.requestGenerateToken = () =>
      this.addRequestToQueue("/authenticate/generatetoken");
    this.requestGenerateTokenV2 = () =>
      this.addRequestToQueue("/v2/authenticate/generatetoken");
    this.requestUserId = () => this.addRequestToQueue("/user_data/user_id");
    this.requestUserUnPaidViolations = () =>
      this.addRequestToQueue("/user_data/violations/unpaid");
    this.requestUserPaidViolations = () =>
      this.addRequestToQueue("/user_data/violations/paid");
    this.requestUserVehicles = () =>
      this.addRequestToQueue("/user_data/vehicles");
    this.requestUserProfilePhoto = () =>
      this.addRequestToQueue("/user_data/user_photo");
    this.requestDeviceInfo = () => this.addRequestToQueue("/capabilities");
    this.requestUserGender = () => this.addRequestToQueue("/user_data/gender");
    this.requestUserType = () => this.addRequestToQueue("/user_data/user_type");
    this.requestUserLocation = () =>
      this.addRequestToQueue("/user_data/user_location");
    this.requestUserNationality = () =>
      this.addRequestToQueue("/user_data/nationality_name");
    this.requestUserNationalityISO = () =>
      this.addRequestToQueue("/user_data/nationality_iso");
    this.requestUserFullName = () =>
      this.addRequestToQueue("/v2/user_data/full_name");
    this.requestUserMaritalStatus = () =>
      this.addRequestToQueue("/user_data/marital_status");
    this.requestUserHealthStatus = () =>
      this.addRequestToQueue("/user_data/health_status");
    this.requestUserDisabilityType = () =>
      this.addRequestToQueue("/user_data/disability_type");
    this.requestUserBloodType = () =>
      this.addRequestToQueue("/user_data/blood_type");
    this.requestUserNationalAddress = () =>
      this.addRequestToQueue("/user_data/national_address");
    this.requestUserDegreeType = () =>
      this.addRequestToQueue("/user_data/degree_type");
    this.requestUserOccupation = () =>
      this.addRequestToQueue("/user_data/occupation");
    this.requestUserMobileNumber = () =>
      this.addRequestToQueue("/user_data/mobile_number");
    this.requestUserBirthDate = () =>
      this.addRequestToQueue("/user_data/birth_date");
    this.requestUserFamilyMembers = () =>
      this.addRequestToQueue("/user_data/family_members");
    this.requestUserSponsors = () =>
      this.addRequestToQueue("/v2/user_data/sponsors");
    //version 1.8
    this.requestUserPassports = () =>
      this.addRequestToQueue("/user_data/passports");
    this.requestUserIdExpiryDate = () =>
      this.addRequestToQueue("/user_data/id_expiry_date");
    this.requestUserEmail = () => this.addRequestToQueue("/user_data/email");
    this.requestUserIqamaType = () =>
      this.addRequestToQueue("/user_data/iqama_type");
    this.requestUserDocumentNumber = () =>
      this.addRequestToQueue("/user_data/user_document_number");
    this.requestGallerySingle = () =>
      this.addRequestToQueue("/gallery/image/single");
    this.requestGalleryMulti = () =>
      this.addRequestToQueue("/gallery/image/multi");
    this.requestGallerySingleVideo = () =>
      this.addRequestToQueue("/gallery/video/single");
    this.requestGalleryMultiVideo = () =>
      this.addRequestToQueue("/gallery/video/multi");
    this.requestCameraPhoto = () => this.addRequestToQueue("/camera/image");
    this.requestCameraVideo = () => this.addRequestToQueue("/camera/video");
    this.requestFileId = () => this.addRequestToQueue("/files");
    this.requestRawData = (media) => {
      if ((typeof media === "string" && media == "") || media.length == 0)
        return this;
      if (typeof media == "string")
        return this.addRequestToQueue(
          `/gallery/raw_data?file_name=${encodeURI(media)}`,
          "GET",
          {},
          true
        );
      for (const m of media)
        this.addRequestToQueue(
          `/gallery/raw_data?file_name=${encodeURI(m.data)}`,
          "GET",
          {},
          true
        );
      return this;
    };
    this.openScreen = async (screenType, valuesParam) => {
      const parameters = {
        screenType,
        openParams: valuesParam,
      };
      return this.httpClient
        .execute("/open_screen", "POST", parameters)
        .then((res) => Promise.resolve(is_succeful_response_default(res)))
        .catch(() => Promise.resolve(false));
    };
    this.scanCode = async () => {
      return this.httpClient
        .execute("/scan_code", "GET", {})
        .then(async (response) => {
          const res = await this.handleResponse(response);
          return Promise.resolve(
            "data" in res ? JSON.parse(res.data).value || "" : ""
          );
        })
        .catch(() => Promise.reject(""));
    };
    this.openUrl = async (url, type) => {
      if (url.trim().length == 0) return false;
      return this.httpClient
        .execute("/actions/open_url", "POST", {
          url,
          url_type: Number(type),
        })
        .then(async (res) => {
          return Promise.resolve(is_succeful_response_default(res));
        })
        .catch(() => Promise.reject(false));
    };
    this.screenShare = async () => {
      return this.httpClient
        .execute("/share/screenshot", "GET", {})
        .then((res) => Promise.resolve("data" in res ? true : false))
        .catch(() => Promise.resolve(false));
    };
    this.postCard = async (type, card) => {
      return this.httpClient
        .execute("/cards", "POST", { payload: card, actionType: type })
        .then(async (response) => {
          const res = await this.handleResponse(response);
          return Promise.resolve(
            "data" in res ? JSON.parse(res.data).twkId || "-1" : "-1"
          );
        })
        .catch(() => Promise.resolve("-1"));
    };
    this.askUserLocationPermission = async () =>
      this.permissionBaseRequest("/ask_permissions/location");
    this.askUserPreciseLocationPermission = async () =>
      this.permissionBaseRequest("/ask_permissions/precise_location");
    this.askCameraPermission = async () =>
      this.permissionBaseRequest("/ask_permissions/camera");
    this.askGalleryPermission = async () =>
      this.permissionBaseRequest("/ask_permissions/gallery");
    this.askPushNotificationPermission = async () =>
      this.permissionBaseRequest("/ask_permissions/push_notification");
    this.authenticateBiometric = async () =>
      this.permissionBaseRequest("/authenticate/biometric");
    this.httpClient = httpClient;
  }
  async sendAll() {
    try {
      const requests = Array.from(this.requestQueue.values());
      const results = await Promise.all(
        requests.map((action) =>
          this.invokeExecution(action.callback, action.isDownloadableFile)
        )
      );
      this.requestQueue.clear();
      const c = {};
      return resolve_array_response_default(c, results);
    } catch (error) {
      throw new Error("Error processing requests: " + error.message);
    }
  }
  addRequestToQueue(
    path,
    method = "GET",
    parameters = {},
    isDownloadableContent = false
  ) {
    const callback = () => this.httpClient.execute(path, method, parameters);
    if (!this.requestQueue.has(path))
      this.requestQueue.set(path, {
        callback,
        isDownloadableFile: isDownloadableContent,
      });
    return this;
  }
  async invokeExecution(action, isDownloadableFile) {
    try {
      const response = await action();
      return this.handleResponse(response, isDownloadableFile);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error occurred during API call"
      );
    }
  }
  async handleResponse(response, isDownloadableFile = false) {
    if ("message" in response) {
      throw new Error(response.message);
    }
    const { data } = response;
    const byteArray = new Uint8Array(data);
    if (isDownloadableFile) {
      const file = await base64_encoder_default.fromRawData(byteArray);
      return { content: file };
    } else {
      const encoder = new TextDecoder();
      return { data: encoder.decode(byteArray) };
    }
  }
  async permissionBaseRequest(url) {
    return this.httpClient
      .execute(url, "GET", {})
      .then(async (response) => {
        const res = await this.handleResponse(response);
        return Promise.resolve(
          "data" in res ? JSON.parse(res.data).granted || false : false
        );
      })
      .catch(() => Promise.resolve(false));
  }
};
var TawakkalnaApi_default = TawakkalnaApi;

// src/twk/helpers/ok-response.ts
var OK = (data) => {
  return {
    data,
  };
};

// src/twk/helpers/error-response.ts
var Error2 = (message) => {
  return {
    message,
  };
};

// src/twk/utils/format-header.ts
var format_header_default = (header) => {
  const headers = [];
  Object.keys(header).forEach((k) =>
    headers.push({ name: k, value: header[k] })
  );
  return headers;
};

// src/twk/guard/is-request-body.ts
var is_request_body_default = (parameters) =>
  typeof parameters === "string" ||
  parameters instanceof FormData ||
  parameters instanceof URLSearchParams;

// src/twk/xhr.ts
var xhr = class _xhr {
  constructor() {}
  async fetch(url, method, headers, parameters) {
    const instance = new XMLHttpRequest();
    return new Promise((resolve2, reject) => {
      instance.ontimeout = function () {
        reject(Error2("timeout"));
      };
      instance.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
          resolve2(_xhr.getHttpResponse(instance));
        }
      };
      instance.responseType = "arraybuffer";
      instance.open(method, url, true);
      format_header_default(headers).forEach((header) =>
        instance.setRequestHeader(header.name, header.value)
      );
      if (method !== "GET")
        if (is_request_body_default(parameters)) instance.send(parameters);
        else instance.send(JSON.stringify(parameters));
      else instance.send();
    });
  }
  static {
    this.getHttpResponse = (httpRequest) => {
      if (httpRequest.readyState != XMLHttpRequest.DONE)
        return Error2(
          "The HTTP request must complete before a response can be received"
        );
      const buffer = httpRequest.response;
      if (httpRequest.status === 200) return OK(buffer);
      else
        return Error2(`Request failed with status code: ${httpRequest.status}`);
    };
  }
};
var xhr_default = new xhr();

// src/twk/index.ts
var http = new HttpClient(
  {
    base: TWKAPIBASE ?? "",
    security: { sharedSecret: SHAREDSECRET ?? "" },
  },
  xhr_default
);
var api = new TawakkalnaApi_default(http);
var twk_default = api;
export {
  BloodType,
  CardActionType,
  Gender,
  MaritalStatus,
  UrlType,
  UserType,
  twk_default as default,
  http,
  xhr_default as xhr,
};
