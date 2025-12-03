//password123
//jfadfofkafaldfkjaoidfjva

const crypto = require("crypto");

console.log("\n MD5 hash: ");
const md5Hash = crypto.createHash("md5").update("password123").digest("hex"); //not recoomended
const md5Hash2 = crypto.createHash("md5").update("password123").digest("hex");

console.log("input: password123 and its protected hashing : ", md5Hash);
console.log("input: password123 and its protected hashing : ", md5Hash2);


const sha256Hash = crypto.createHash("sha256").update("password123").digest("hex");
console.log("input: password123 and its SHA256 HASHEDPASSWORD protected hashing : ", sha256Hash);

const sha512Hash = crypto.createHash("sha512").update("password123").digest("hex");
console.log("SHA512 PASSWORD : ", sha512Hash);