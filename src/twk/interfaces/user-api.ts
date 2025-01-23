import { User } from "../types";

interface UserApi {
  requestGenerateToken: () => UserApi;
  requestGenerateTokenV2: () => UserApi;
  requestUserId: () => UserApi;
  requestUserUnPaidViolations: () => UserApi;
  requestUserPaidViolations: () => UserApi;
  requestUserVehicles: () => UserApi;
  requestUserProfilePhoto: () => UserApi;
  requestUserGender: () => UserApi;
  requestUserType: () => UserApi;
  requestUserLocation: () => UserApi;
  requestUserNationality: () => UserApi;
  requestUserNationalityISO: () => UserApi;
  requestUserFullName: () => UserApi;
  requestUserMaritalStatus: () => UserApi;
  requestUserHealthStatus: () => UserApi;
  requestUserDisabilityType: () => UserApi;
  requestUserBloodType: () => UserApi;
  requestUserNationalAddress: () => UserApi;
  requestUserDegreeType: () => UserApi;
  requestUserOccupation: () => UserApi;
  requestUserMobileNumber: () => UserApi;
  requestUserBirthDate: () => UserApi;
  requestUserFamilyMembers: () => UserApi;
  requestUserSponsors: () => UserApi;

  requestUserPassports: () => UserApi;
  requestUserIdExpiryDate: () => UserApi;
  requestUserEmail: () => UserApi;
  requestUserIqamaType: () => UserApi;
  requestUserDocumentNumber: () => UserApi;

  sendAll: () => Promise<User>;
}
export default UserApi;
