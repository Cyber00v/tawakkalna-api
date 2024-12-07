import {
  HttpMethod,
  HttpResponseReturnType,
  SuccessResponse,
  TawakkalnaEntity,
} from "./types";
import { Media, Gallery, User, RawData, CardActionType, Card } from "./types";

import { UserApi, GalleryApi, FileApi } from "./interfaces";
import { ActionApi, PermissionApi } from "./interfaces";
import { HttpClient } from "./http-client";

import base64Encoder from "./utils/base64-encoder";
import resolve from "./helpers/resolve-array-response";

class TawakkalnaApi
  implements GalleryApi, UserApi, ActionApi, FileApi, PermissionApi
{
  private readonly httpClient: HttpClient;
  private readonly requestQueue = new Map<
    string,
    {
      callback: () => Promise<HttpResponseReturnType>;
      isDownloadableFile: boolean;
    }
  >();

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public requestGenerateToken = (): UserApi =>
    this.addRequestToQueue("/authenticate/generatetoken");

  public requestUserId = (): UserApi =>
    this.addRequestToQueue("/user_data/user_id");

  public requestUserUnPaidViolations = (): UserApi =>
    this.addRequestToQueue("/user_data/violations/unpaid");

  public requestUserPaidViolations = (): UserApi =>
    this.addRequestToQueue("/user_data/violations/paid");

  public requestUserVehicles = (): UserApi =>
    this.addRequestToQueue("/user_data/vehicles");

  public requestUserProfilePhoto = (): UserApi =>
    this.addRequestToQueue("/user_data/user_photo");

  public requestDeviceInfo = (): UserApi =>
    this.addRequestToQueue("/capabilities");

  public requestUserGender = (): UserApi =>
    this.addRequestToQueue("/user_data/user_type");

  public requestUserType = (): UserApi =>
    this.addRequestToQueue("/user_data/gender");

  public requestUserLocation = (): UserApi =>
    this.addRequestToQueue("/user_data/user_location");

  public requestUserNationality = (): UserApi =>
    this.addRequestToQueue("/user_data/nationality_name");

  public requestUserNationalityISO = (): UserApi =>
    this.addRequestToQueue("/user_data/nationality_iso");

  public requestUserFullName = (): UserApi =>
    this.addRequestToQueue("/user_data/full_name");

  public requestUserMaritalStatus = (): UserApi =>
    this.addRequestToQueue("/user_data/marital_status");

  public requestUserHealthStatus = (): UserApi =>
    this.addRequestToQueue("/user_data/health_status");

  public requestUserDisabilityType = (): UserApi =>
    this.addRequestToQueue("/user_data/disability_type");

  public requestUserBloodType = (): UserApi =>
    this.addRequestToQueue("/user_data/blood_type");

  public requestUserNationalAddress = (): UserApi =>
    this.addRequestToQueue("/user_data/national_address");

  public requestUserDegreeType = (): UserApi =>
    this.addRequestToQueue("/user_data/degree_type");

  public requestUserOccupation = (): UserApi =>
    this.addRequestToQueue("/user_data/occupation");

  public requestUserMobileNumber = (): UserApi =>
    this.addRequestToQueue("/user_data/mobile_number");

  public requestUserBirthDate = (): UserApi =>
    this.addRequestToQueue("/user_data/birth_date");

  public requestUserFamilyMembers = (): UserApi =>
    this.addRequestToQueue("/user_data/birth_date");

  public requestUserSponsors = (): UserApi =>
    this.addRequestToQueue("/user_data/birth_date");

  public requestGallerySingle = (): GalleryApi =>
    this.addRequestToQueue("/gallery/image/single");

  public requestGalleryMulti = (): GalleryApi =>
    this.addRequestToQueue("/gallery/image/multi");

  public requestGallerySingleVideo = (): GalleryApi =>
    this.addRequestToQueue("/gallery/video/single");

  public requestGalleryMultiVideo = (): GalleryApi =>
    this.addRequestToQueue("/gallery/video/multi");

  public requestCameraPhoto = (): GalleryApi =>
    this.addRequestToQueue("/camera/image");

  public requestCameraVideo = (): GalleryApi =>
    this.addRequestToQueue("/camera/video");

  public requestFileId = (): GalleryApi => this.addRequestToQueue("/files");

  public requestRawData = (media: string | Media[]): FileApi => {
    if ((typeof media === "string" && media == "") || media.length == 0)
      return this;

    if (typeof media == "string")
      return this.addRequestToQueue(
        `/gallery/raw_data?file_name=${media}`,
        "GET",
        {},
        true
      );

    for (const m of media)
      this.addRequestToQueue(
        `/gallery/raw_data?file_name=${m.data}`,
        "GET",
        {},
        true
      );
    return this;
  };

  public openScreen = async (
    screenType: string,
    valuesParam: { key: string; value: string }[]
  ): Promise<boolean> => {
    const parameters = {
      screenType: screenType,
      openParams: valuesParam,
    };

    return this.httpClient
      .execute("/open_screen", "POST", parameters)
      .then((res) => Promise.resolve("data" in res ? true : false))
      .catch(() => Promise.resolve(false));
  };

  public screenShare = async (): Promise<boolean> => {
    return this.httpClient
      .execute("/share/screenshot", "POST", {})
      .then((res) => Promise.resolve("data" in res ? true : false))
      .catch(() => Promise.resolve(false));
  };

  public postCard = async (
    type: CardActionType,
    card: Card
  ): Promise<string> => {
    return this.httpClient
      .execute("/cards", "POST", { payload: card, actionType: type })
      .then((res) =>
        Promise.resolve(
          "data" in res ? JSON.parse(res.data as string).twkId : "-1"
        )
      )
      .catch(() => Promise.resolve("-1"));
  };

  public askUserLocationPermission = async (): Promise<boolean> =>
    this.permissionBaseRequest("/ask_permissions/location");

  public askUserPreciseLocationPermission = async (): Promise<boolean> =>
    this.permissionBaseRequest("/ask_permissions/precise_location");

  public askCameraPermission = async (): Promise<boolean> =>
    this.permissionBaseRequest("/ask_permissions/camera");

  public askGalleryPermission = async (): Promise<boolean> =>
    this.permissionBaseRequest("/ask_permissions/gallery");

  public askPushNotificationPermission = async (): Promise<boolean> =>
    this.permissionBaseRequest("/ask_permissions/push_notification");

  public authenticateBiometric = async (): Promise<boolean> =>
    this.permissionBaseRequest("/authenticate/biometric");

  public async sendAll(): Promise<RawData>;
  public async sendAll(): Promise<User>;
  public async sendAll(): Promise<Gallery>;
  public async sendAll(): Promise<any> {
    try {
      const requests = Array.from(this.requestQueue.values());
      const results = await Promise.all(
        requests.map((action) =>
          this.invokeExecution(action.callback, action.isDownloadableFile)
        )
      );
      this.requestQueue.clear();
      const c: TawakkalnaEntity = {};
      return resolve(c, results);
    } catch (error: any) {
      throw new Error("Error processing requests: " + error.message);
    }
  }

  // public async sendAll(): Promise<TawakkalnaEntity> {
  //   const requests = Array.from(this.pendingRequests.values());
  //   const results = [];

  //   for (const action of requests) {
  //     try {
  //       const result = await this.invokeExecution(
  //         action.callback,
  //         action.isDownloadableFile
  //       );
  //       results.push(result);
  //     } catch (error: any) {
  //       throw new Error("Error processing requests: " + error.message);
  //     }
  //   }

  //   this.pendingRequests.clear();
  //   const c: TawakkalnaEntity = {};

  //   return resolve(c, results);
  // }

  private addRequestToQueue(
    path: string,
    method: HttpMethod = "GET",
    parameters: Record<string, any> = {},
    isDownloadableContent: boolean = false
  ): TawakkalnaApi {
    const callback = () => this.httpClient.execute(path, method, parameters);
    if (!this.requestQueue.has(path))
      this.requestQueue.set(path, {
        callback,
        isDownloadableFile: isDownloadableContent,
      });

    return this;
  }

  private async invokeExecution(
    action: () => Promise<HttpResponseReturnType>,
    isDownloadableFile: boolean
  ): Promise<HttpResponseReturnType> {
    try {
      const response = await action();
      return this.handleResponse(response, isDownloadableFile);
      //handle error response
    } catch (error: any) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "Error occurred during API call"
      );
    }
  }
  private async handleResponse(
    response: HttpResponseReturnType,
    isDownloadableFile: boolean = false
  ): Promise<HttpResponseReturnType> {
    if ("message" in response) {
      throw new Error(response.message);
    }
    //handle successful response
    const { data } = response as SuccessResponse;
    const byteArray = new Uint8Array(data as ArrayBuffer);
    //downloadable content such as video or image
    if (isDownloadableFile) {
      const file = await base64Encoder.fromRawData(byteArray);
      return { content: file }; //return file response
    } else {
      //plain response
      const encoder = new TextDecoder();
      return { data: encoder.decode(byteArray) };
    }
  }

  private async permissionBaseRequest(url: string): Promise<boolean> {
    return this.httpClient.execute(url, "GET", {}).then(async (response) => {
      const res = await this.handleResponse(response);
      return Promise.resolve(
        "data" in res ? JSON.parse(res.data as string).granted || false : false
      ).catch(() => Promise.resolve(false));
    });
  }
}
export default TawakkalnaApi;
