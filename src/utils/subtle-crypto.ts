import base64encoder from "./base64-encoder";

const subtleCrypto = {
  sign: async (
    message: string,
    key: string,
    algorithm: { name: string; hash: { name: string } } = {
      name: "HMAC",
      hash: { name: "SHA-256" },
    }
  ) => {
    try {
      const encoder = new TextEncoder();
      const encodedKey = encoder.encode(key);
      const encodedMessage = encoder.encode(message);
      const keyBuffer = await crypto.subtle.importKey(
        "raw",
        encodedKey,
        algorithm,
        false,
        ["sign"]
      );

      const signatureBuffer = await crypto.subtle.sign(
        algorithm.name,
        keyBuffer,
        encodedMessage
      );

      return base64encoder.fromBuffer(signatureBuffer);
    } catch (error) {
      console.error("Error calculating HMAC:", error);
      return null;
    }
  },

  digest: async (
    message: string,
    algorithm: AlgorithmIdentifier = "SHA-256"
  ) => {
    const buffer = new TextEncoder().encode(message);
    return await crypto.subtle.digest(algorithm, buffer).then(function (hash) {
      return base64encoder.fromBuffer(hash);
    });
  },
};
export default subtleCrypto;
