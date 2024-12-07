import type { HttpMethod } from "../types";
import subtleCrypto from "./subtle-crypto";
import entries from "./object-entries";

export default (
  path: string,
  method: HttpMethod,
  messageBody: string,
  SHAREDSECRET: string
): Promise<Record<string, string>> => {
  return new Promise((resolve) => {
    subtleCrypto.digest(messageBody).then((digest) => {
      let requestTarget = `${method.toLowerCase()} ${path}`;
      const headers: { [k: string]: string } = {
        Digest: `SHA-256=${digest}`,
        "Date-Time": new Date().toUTCString(),
        "Host-Name": "localhost",
        "Request-Target": requestTarget,
      };

      var signatureParams = "";
      for (const [key, value] of entries(headers))
        signatureParams += `${key}: ${value},`;

      subtleCrypto.sign(signatureParams, SHAREDSECRET).then((signature) => {
        let sigend_headers = Object.keys(headers);
        headers[
          "Signature"
        ] = `Signature: algorithm="HMAC-SHA256",headers="${sigend_headers}",signature="${signature}"`;

        resolve(headers);
      });
    });
  });
};
