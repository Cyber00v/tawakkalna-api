import { HttpClient } from "./http-client";
import type {
  TawakkalnaEntity,
  Gallery,
  UserPhoto,
  User,
  DeviceInfo,
  Vehicle,
  Violation,
  Member,
  Sponsor,
  Address,
  RawData,
  ViolationStatus,
  MediaType,
} from "./types";
import {
  BloodType,
  Gender,
  MaritalStatus,
  UserType,
  CardActionType,
  UrlType,
} from "./types";
import TawakkalnaApi from "./TawakkalnaApi";
import xhr from "./xhr";

const http: HttpClient = new HttpClient(
  { base: TWKAPIBASE ?? "", security: { sharedSecret: SHAREDSECRET ?? "" } },
  xhr
);
const api = new TawakkalnaApi(http);

export default api;
export type {
  User,
  UserPhoto,
  Gallery,
  DeviceInfo,
  TawakkalnaEntity,
  Vehicle,
  Violation,
  MediaType,
  Member,
  Sponsor,
  Address,
  RawData,
};

export {
  BloodType,
  Gender,
  ViolationStatus,
  MaritalStatus,
  UserType,
  CardActionType,
  UrlType,
  http,
  xhr,
};
