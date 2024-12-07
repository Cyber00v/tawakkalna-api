interface PermissionApi {
  askUserLocationPermission: () => Promise<boolean>;
  askUserPreciseLocationPermission: () => Promise<boolean>;
  askCameraPermission: () => Promise<boolean>;
  askGalleryPermission: () => Promise<boolean>;
  askPushNotificationPermission: () => Promise<boolean>;
  authenticateBiometric: () => Promise<boolean>;
}
export default PermissionApi;
