const https = require("https");
const { apiHost, apiKey, instrumentNobleGold } = require("./config");
const { generateQuote } = require("./quotes");

/**
 * Places a transfer order for the specified quantity of NobleGold to a counterparty.
 *
 * @param {number} quantity - Amount of NobleGold to send
 * @param {Object} session - Auth session
 * @param {string} counterpartyHandle - Recipient's LQN handle
 * @returns {Promise<Object>}
 */
function placeTransferOrder(
  quantity,
  session,
  counterpartyHandle = "liquidnoble@lqn.app"
) {
  return generateQuote(
    quantity,
    null,
    instrumentNobleGold,
    session.entityId,
    session.token,
    4,
    counterpartyHandle
  ).then((quote) => {
    const url = apiHost + "/order/transfer/";
    const body = JSON.stringify({
      entity_id: session.entityId,
      profile_id: session.profileId,
      quote_id: quote.quote_id,
      unlocking_key: session.unlockingKey,
      mfa_code: "",
      activity_id: "",
      memo: "Transfer via SDK CLI",
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    };

    if (apiKey) {
      headers["x-api-key"] = apiKey;
    }

    return new Promise((resolve, reject) => {
      const req = https.request(url, { method: "POST", headers }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode === 200) {
              resolve(parsed);
            } else {
              reject(new Error(parsed.message || "Transfer order failed"));
            }
          } catch (err) {
            reject(new Error("Invalid JSON response"));
          }
        });
      });

      req.on("error", reject);
      req.write(body);
      req.end();
    });
  });
}

module.exports = { placeTransferOrder };
