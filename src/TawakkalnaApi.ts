import {
  ErrorResponse,
  HttpMethod,
  HttpResponse,
  SuccessResponse,
} from "./types";
import { HttpClient } from "./HttpClient";
import base64Encoder from "./utils/base64-encoder";

class TawakkalnaApi {
  private readonly httpClient: HttpClient;
  private readonly pendingRequests = new Map<
    string,
    {
      callback: () => Promise<HttpResponse>;
      isDownloadableFile: boolean;
    }
  >();

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  public requestGenerateToken = (): TawakkalnaApi =>
    this.baseRequest("/authenticate/generatetoken");

  public requestUserId = (): TawakkalnaApi =>
    this.baseRequest("/user_data/user_id");

  public requestUserUnPaidViolations = (): TawakkalnaApi =>
    this.baseRequest("/user_data/violations/unpaid");

  public requestUserPaidViolations = (): TawakkalnaApi =>
    this.baseRequest("/user_data/violations/paid");

  public requestUserVehicles = (): TawakkalnaApi =>
    this.baseRequest("/user_data/vehicles");

  public requestUserProfilePhoto = (): TawakkalnaApi =>
    this.baseRequest("/user_data/user_photo");

  public requestDeviceInfo = (): TawakkalnaApi =>
    this.baseRequest("/capabilities");

  public requestUserGender = (): TawakkalnaApi =>
    this.baseRequest("/user_data/user_type");

  public requestUserType = (): TawakkalnaApi =>
    this.baseRequest("/user_data/gender");

  public requestUserLocation = (): TawakkalnaApi =>
    this.baseRequest("/user_data/user_location");

  public requestUserNationality = (): TawakkalnaApi =>
    this.baseRequest("/user_data/nationality_name");

  public requestUserNationalityISO = (): TawakkalnaApi =>
    this.baseRequest("/user_data/nationality_iso");

  public requestUserFullName = (): TawakkalnaApi =>
    this.baseRequest("/user_data/full_name");

  public requestUserMaritalStatus = (): TawakkalnaApi =>
    this.baseRequest("/user_data/marital_status");

  public requestUserHealthStatus = (): TawakkalnaApi =>
    this.baseRequest("/user_data/health_status");

  public requestUserDisabilityType = (): TawakkalnaApi =>
    this.baseRequest("/user_data/disability_type");

  public requestUserBloodType = (): TawakkalnaApi =>
    this.baseRequest("/user_data/blood_type");

  public requestUserNationalAddress = (): TawakkalnaApi =>
    this.baseRequest("/user_data/national_address");

  public requestUserDegreeType = (): TawakkalnaApi =>
    this.baseRequest("/user_data/degree_type");

  public requestUserOccupation = (): TawakkalnaApi =>
    this.baseRequest("/user_data/occupation");

  public requestUserMobileNumber = (): TawakkalnaApi =>
    this.baseRequest("/user_data/mobile_number");

  public requestUserBirthDate = (): TawakkalnaApi =>
    this.baseRequest("/user_data/birth_date");

  public requestGallerySingle = (): TawakkalnaApi =>
    this.baseRequest("/gallery/image/single");

  public requestGalleryMulti = (): TawakkalnaApi =>
    this.baseRequest("/gallery/image/multi");

  public requestGallerySingleVideo = (): TawakkalnaApi =>
    this.baseRequest("/gallery/video/single");

  public requestGalleryMultiVideo = (): TawakkalnaApi =>
    this.baseRequest("/gallery/video/multi");

  public requestCameraPhoto = (): TawakkalnaApi =>
    this.baseRequest("/camera/image");

  public requestCameraVideo = (): TawakkalnaApi =>
    this.baseRequest("/camera/video");

  public requestFileById = (): TawakkalnaApi => this.baseRequest("/files");

  public requestOpenScreen = (
    screenType: string,
    valuesParam: { key: string; value: string }[]
  ): TawakkalnaApi => {
    const parameters = {
      screenType: screenType,
      openParams: valuesParam,
    };
    return this.baseRequest("/open_screen", "POST", parameters);
  };

  public requestScreenShare = (): TawakkalnaApi =>
    this.baseRequest("/share/screenshot");

  public requestRawData = (file: string): TawakkalnaApi =>
    this.baseRequest(`/gallery/raw_data?file_name=${file}`, "GET", {}, true);

  public sendAll(): Promise<HttpResponse[]> {
    return new Promise(async (resolve, reject) => {
      const results: HttpResponse[] = [];
      for (const [key, action] of this.pendingRequests.entries()) {
        try {
          const response = await action.callback();

          if ("message" in response) {
            throw new Error(response.message);
          }

          const { data } = response as SuccessResponse;

          const byteArray = new Uint8Array(data as ArrayBuffer);

          if (action.isDownloadableFile) {
            const file = await base64Encoder.fromRawData(byteArray);
            results.push({ type: "file", mime_type: "mime_type", data: file });
          } else {
            const encoder = new TextDecoder();
            results.push({
              data: encoder.decode(byteArray),
            } as SuccessResponse);
          }

          this.pendingRequests.delete(key);
        } catch (error: any) {
          const message =
            error instanceof Error
              ? error.message
              : "Error ocurred during calling api action";
          reject({
            message,
          } as ErrorResponse);
        }
      }
      resolve(results);
    });
  }

  private baseRequest(
    path: string,
    method: HttpMethod = "GET",
    parameters: Record<string, any> = {},
    isDownloadableContent: boolean = false
  ): TawakkalnaApi {
    const callback = () => this.httpClient.execute(path, method, parameters);
    if (!this.pendingRequests.has(path))
      this.pendingRequests.set(path, {
        callback,
        isDownloadableFile: isDownloadableContent,
      });

    return this;
  }
}
export default TawakkalnaApi;
