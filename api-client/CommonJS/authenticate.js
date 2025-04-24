const { apiHost, apiKey } = require("./config");
const https = require("https");

/**
 * Authenticate with Liquid Noble API.
 * Returns a JWT token, unlocking key, and account identifiers.
 *
 * @param {string} username - Your registered Liquid Noble username (email)
 * @param {string} password - Your password
 * @returns {Promise<Object>} Auth session including JWT and unlocking key
 */
function authenticate(username, password) {
  const url = apiHost + "/user/authenticate/";
  const body = JSON.stringify({
    username: username,
    password: password,
    mfa_code: "", // Leave blank if using API key
  });

  const headers = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "POST",
        headers,
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const json = JSON.parse(data);
              resolve({
                token: json.token,
                unlockingKey: json.unlocking_key,
                entityId: json.entity_id,
                profileId: json.profile_id,
                lockboxId: json.lockbox_id,
              });
            } catch (e) {
              reject(new Error("Invalid JSON response"));
            }
          } else {
            try {
              const error = JSON.parse(data);
              reject(new Error(error.message || "Authentication failed"));
            } catch {
              reject(new Error("Authentication failed"));
            }
          }
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = { authenticate };
