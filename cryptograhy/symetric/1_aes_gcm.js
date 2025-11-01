// Run: node aes_gcm.js
// Requires: Node.js v16+
// Uses AES-256-GCM with scrypt KDF

const { randomBytes, createCipheriv, createDecipheriv, scrypt } = require("crypto");
const { promisify } = require("util");
const scryptAsync = promisify(scrypt);

// Tune these to your machine/security needs
const SCRYPT_N = 1 << 14;     // 16384 (was 32768)
const SCRYPT_r = 8;
const SCRYPT_p = 1;
// Increase maxmem above the working set; 256MB is safe on most dev machines
const SCRYPT_MAXMEM = 256 * 1024 * 1024;

async function deriveKey(password, salt) {
  return scryptAsync(
    Buffer.isBuffer(password) ? password : Buffer.from(password),
    salt,
    32,
    { N: SCRYPT_N, r: SCRYPT_r, p: SCRYPT_p, maxmem: SCRYPT_MAXMEM }
  );
}

/**
 * Encrypts plaintext using AES-256-GCM.
 * @param {Buffer|string} plaintext
 * @param {string|Buffer} password - user password to derive key
 * @param {Buffer|string} [aad] - associated data (authenticated, not encrypted)
 * @returns {Promise<string>} base64(salt|iv|ciphertext|tag)
 */
async function encrypt(plaintext, password, aad) {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt);
  const iv = randomBytes(12); // 96-bit IV recommended for GCM

  const cipher = createCipheriv("aes-256-gcm", key, iv);

  if (aad !== undefined) {
    cipher.setAAD(Buffer.isBuffer(aad) ? aad : Buffer.from(aad));
  }

  const ct = Buffer.concat([
    cipher.update(Buffer.isBuffer(plaintext) ? plaintext : Buffer.from(plaintext)),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag(); // 16 bytes

  const out = Buffer.concat([salt, iv, ct, tag]);
  return out.toString("base64");
}

/**
 * Decrypts a base64(salt|iv|ciphertext|tag) payload using AES-256-GCM.
 * @param {string} b64
 * @param {string|Buffer} password
 * @param {Buffer|string} [aad]
 * @returns {Promise<Buffer>}
 */

async function decrypt(b64, password, aad) {
  const data = Buffer.from(b64, "base64");
  if (data.length < 16 + 12 + 16) {
    throw new Error("ciphertext too short");
  }

  const salt = data.subarray(0, 16);
  const iv = data.subarray(16, 28);
  const tag = data.subarray(data.length - 16);
  const ct = data.subarray(28, data.length - 16);

  const key = await deriveKey(password, salt);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);

  if (aad !== undefined) {
    decipher.setAAD(Buffer.isBuffer(aad) ? aad : Buffer.from(aad));
  }

  decipher.setAuthTag(tag);
  const pt = Buffer.concat([decipher.update(ct), decipher.final()]);
  return pt;
}

// --- Demo when run directly ---
if (require.main === module) {
  (async () => {
    try {
      const password = "correct horse battery staple";
      const message = "Hello AES-GCM 👋";
      const aad = "context:demo:v1";

      const sealed = await encrypt(message, password, aad);
      console.log("Encrypted (base64):", sealed.slice(0, 64) + "...");

      const opened = await decrypt(sealed, password, aad);
      console.log("Decrypted:", opened.toString());

      // Wrong AAD should fail
      await decrypt(sealed, password, "wrong-aad")
        .then(() => console.error("Unexpected: decrypt success with wrong AAD"))
        .catch((e) => console.log("As expected, wrong AAD fails:", e.message));
    } catch (e) {
      console.error("Error:", e);
      process.exit(1);
    }
  })();
}
