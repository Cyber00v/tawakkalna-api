import { Gallery } from "../types";

interface GalleryApi {
  requestGallerySingle: () => GalleryApi;
  requestGalleryMulti: () => GalleryApi;
  requestGallerySingleVideo: () => GalleryApi;
  requestGalleryMultiVideo: () => GalleryApi;
  requestCameraPhoto: () => GalleryApi;
  requestCameraVideo: () => GalleryApi;
  requestFileId: () => GalleryApi;
  sendAll: () => Promise<Gallery>;
}
export default GalleryApi;
