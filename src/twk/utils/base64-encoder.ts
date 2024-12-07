import padStart from "./pad-start";

const base64Encoder = {
  fromBuffer: (arrayBuffer: ArrayBuffer) => {
    const hex = Array.from(new Uint8Array(arrayBuffer))
      .map((byte) => padStart(byte.toString(16), 2, "0"))
      .join("");
    return btoa(hex);
  },
  fromRawData: async (bytes: Uint8Array) => {
    return new Promise<string>((resolve, reject) => {
      const blob = new Blob([bytes]);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const dataUrl = e.target?.result || "";
        const [_, base64] = (dataUrl as string).split(",");
        return resolve(base64);
      };
      reader.onerror = () => reject("Error occurred reading file");
      reader.readAsDataURL(blob);
    });
  },
};

export default base64Encoder;
