// export type Gender = "male" | "female";
// export type MaritalStatus = "single" | "married";
// export type UserType = "Citizen" | "Resident" | "Visitor" | "Unknown";
// export type MediaType = "document" | "image" | "video";
// export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O-" | "O+";
// export type ViolationStatus = "UNPAID" | "PAID";
// export type UserPhoto = { data: string };

// export type Media = [type: MediaType, mimeType: string, data: string];

// export type AddressSummary = {
//   addressCounter: string;
//   sectionType: string;
//   addressAr: string;
//   addressEn: string;
//   latitude: number | string;
//   longitude: number | string;
// };

// export type AddressDetails = {
//   additionalNumber: string;
//   buildingNumber: string;
//   city: string;
//   districtName: string;
//   sectionType: string;
//   shortAddress: string;
//   streetName: string;
//   zipCode: string;
// };

// export type Address = {
//   isPrimaryAddress: boolean;
//   detailsAr: AddressDetails;
//   detailsEn: AddressDetails;
//   details: AddressDetails;
//   summary: AddressSummary;
// };

// export type MemberDetails = {
//   nationality: string;
//   relation: string;
//   passportNumber: string;
//   birthDate: Date | string;
//   birthCity: string;
// };

// export type Member = {
//   national_id: number;
//   arabicName: string;
//   englishName: string;
//   gender: Gender;
//   details: MemberDetails;
// };

// export type Sponsor = Omit<Member, "details"> & {
//   details: Omit<MemberDetails, "relation">;
//   detailsAr: Omit<MemberDetails, "relation">;
//   detailsEn: Omit<MemberDetails, "relation">;
// };

// export type Violation = {
//   manufacturer: string;
//   plateNumber: string;
//   streetSpeed: number | string;
//   totalFineAmount: number | string;
//   vehicleModel: string;
//   vehicleSpeed: number | string;
//   vehicleType: string;
//   violationCity: string;
//   violationDateTime: string;
//   violationNumber: string;
//   violationStatus: ViolationStatus;
//   violationType: string;
// };

// export type Vehicle = {
//   plateNumber: string;
//   registrationType: string;
//   majorColor: string;
//   model: string;
//   status: string;
//   modelYear: string;
//   identificationNumber: string;
//   serialNumber: string;
//   loadCapacity: string;
//   weight: string;
//   registrationExpiryDate: Date;
//   manufacturer: string;
// };

// export type User = Partial<{
//   userId: number;
//   fullName: string;
//   userPhoto: UserPhoto;
//   userType: UserType;
//   birthDate: Date | string;
//   mobileNumber: string;
//   gender: Gender;
//   nationality: string;
//   nationalityIso: string;
//   maritalStatus: MaritalStatus;
//   bloodType: BloodType;
//   degreeType: string;
//   occupation: string;
//   nationalAddresses: Address[];
//   sponsors: Sponsor[];
//   members: Member[];
//   violations: Violation[];
//   vehicle: Vehicle[];
// }>;

// export type Gallery = {
//   images: Media[];
//   videos: Media[];
// };

// export type DeviceInfo = {
//   deviceModel: string;
//   osVersion: number | string;
//   appearance: number | string;
//   appLanguage: string;
// };

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type SuccessResponse = {
  data: JsonString | Blob | Document | object | ArrayBuffer;
};
export type FileResponse = {
  type: string;
  mime_type: string;
  data: JsonString | Blob | Document | object | ArrayBuffer;
};
export type ErrorResponse = {
  message: string;
};
export type HttpResponse = SuccessResponse | FileResponse | ErrorResponse;
export type JsonString = string;
