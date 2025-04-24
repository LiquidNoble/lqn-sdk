const https = require("https");
const { apiHost, apiKey, instrumentNobleGold } = require("./config");
const { generateQuote } = require("./quotes");

/**
 * Places a transfer order sending NobleGold to liquidnoble@lqn.app.
 *
 * @param {number} quantity - Amount of NobleGold to send
 * @param {Object} session - Auth session: { token, unlockingKey, entityId, profileId, lockboxId }
 * @returns {Promise<Object>}
 */
function placeTransferOrder(quantity, session) {
  const counterpartyHandle = "liquidnoble@lqn.app";

  return generateQuote(
    quantity,
    null, // order_instrument_id is null for transfer
    instrumentNobleGold,
    session.entityId,
    session.token,
    4, // order_type = 4 (Transfer)
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
      memo: "Transfer test to Liquid Noble",
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
