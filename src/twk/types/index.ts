import arrayEnum from "../utils/array-enum";

export enum Gender {
  "male" = 1,
  "female",
}

export enum MaritalStatus {
  "single" = "single",
  "married" = "married",
}

export enum UserType {
  "citizen" = 1,
  "resident",
  "visitor",
  "",
}
export type MediaType = "document" | "image" | "video";

export enum BloodType {
  "A+" = 1,
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O-",
  "O+",
}

export enum CardActionType {
  "Add" = 1,
  "Update",
  "Remove",
}

export type ViolationStatus = "UNPAID" | "PAID";
export type UserPhoto = { data: string };

export type Media = { type: MediaType; mimeType: string; data: string };

export type AddressSummary = {
  addressCounter: string;
  sectionType: string;
  addressAr: string;
  addressEn: string;
  latitude: number | string;
  longitude: number | string;
};

export type AddressDetails = {
  additionalNumber: string;
  buildingNumber: string;
  city: string;
  districtName: string;
  sectionType: string;
  shortAddress: string;
  streetName: string;
  zipCode: string;
};

export type Address = {
  isPrimaryAddress: boolean;
  detailsAr: AddressDetails;
  detailsEn: AddressDetails;
  details: AddressDetails;
  summary: AddressSummary;
};

export type MemberDetails = {
  nationality: string;
  relation: string;
  passportNumber: string;
  birthDate: Date | string;
  birthCity: string;
};

export type Member = {
  nationalId: number;
  nameAr: string;
  nameEn: string;
  gender: Gender;
  details: MemberDetails;
};

export type Sponsor = Omit<Member, "details"> & {
  details: Omit<MemberDetails, "relation">;
  detailsAr: Omit<MemberDetails, "relation">;
  detailsEn: Omit<MemberDetails, "relation">;
};

export type Violation = {
  manufacturer: string;
  plateNumber: string;
  streetSpeed: number | string;
  totalFineAmount: number | string;
  vehicleModel: string;
  vehicleSpeed: number | string;
  vehicleType: string;
  violationCity: string;
  violationDateTime: string;
  violationNumber: string;
  violationStatus: ViolationStatus;
  violationType: string;
};

export type Vehicle = {
  plateNumber: string;
  registrationType: string;
  majorColor: string;
  model: string;
  status: string;
  modelYear: string;
  identificationNumber: string;
  serialNumber: string;
  loadCapacity: string;
  weight: string;
  registrationExpiryDate: Date;
  manufacturer: string;
};

export type User = Partial<{
  token: string;
  userId: number;
  fullName: string;
  userPhoto: UserPhoto;
  userType: UserType;
  birthDate: Date | string;
  mobileNumber: string;
  gender: Gender;
  nationality: string;
  nationalityIso: string;
  maritalStatus: MaritalStatus;
  bloodType: BloodType;
  degreeType: string;
  occupation: string;
  nationalAddresses: Address[];
  sponsors: Sponsor[];
  members: Member[];
  violations: Violation[];
  vehicles: Vehicle[];
}>;

export type Gallery = {
  images?: Media[];
  videos?: Media[];
  documents?: Media[];
};

export type Card = {
  agencyId: number;
  cardID: number;
  referenceNumber: number;
  attributes: { key: string; value: string }[];
  expirationDate: Date | string;
};
export type File = {
  base64: string;
};

export type RawData = {
  files?: File[];
};

export type DeviceInfo = {
  deviceModel?: string;
  osVersion?: number | string;
  appearance?: number | string;
  appLanguage?: string;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type JsonString = string;

export type SuccessResponse = {
  data: JsonString | Blob | Document | object | ArrayBuffer;
};
export type FileResponse = {
  content: JsonString | Blob | Document | object | ArrayBuffer;
};
export type ErrorResponse = {
  message: string;
};
export type HttpResponseReturnType =
  | SuccessResponse
  | FileResponse
  | ErrorResponse;

export type extendType<A extends object, B extends object> = {
  [K in keyof A as K extends keyof B ? never : K]: A[K];
} & {
  [K in keyof B]: B[K];
};

export type allKeys<T> = T extends any ? keyof T : never;

export const TawakkalnaEntityEnum = arrayEnum([
  "token",
  "userId",
  "fullName",
  "userPhoto",
  "userType",
  "birthDate",
  "mobileNumber",
  "gender",
  "nationality",
  "nationalityIso",
  "maritalStatus",
  "bloodType",
  "degreeType",
  "occupation",
  "nationalAddresses",
  "sponsors",
  "members",
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
]);

export type TawakkalnaEntity = extendType<
  User,
  extendType<Gallery, extendType<RawData, DeviceInfo>>
>;
