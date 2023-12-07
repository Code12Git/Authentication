import crypto from "crypto";
function generateRandomToken(length) {
  return crypto.randomBytes(length).toString("hex");
}

export default generateRandomToken;
