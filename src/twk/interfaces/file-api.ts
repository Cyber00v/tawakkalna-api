import { Media, RawData } from "../types";

interface FileApi {
  requestRawData: (mediaId: string | Media[]) => FileApi;
  sendAll: () => Promise<RawData>;
}
export default FileApi;
