const https = require("https");
const { apiHost, apiKey } = require("./config");
const { generateQuote } = require("./quotes");

/**
 * Places a buy order for the specified instrument using a specified payment instrument.
 *
 * @param {number} quantity - Amount of instrument to buy
 * @param {string} buyInstrumentId - Instrument ID of the asset to be purchased
 * @param {string} paymentInstrumentId - Instrument ID of the token used to pay
 * @param {Object} session - Auth session: { token, unlockingKey, entityId, profileId, lockboxId }
 * @returns {Promise<Object>}
 */
function placeBuyOrder(
  quantity,
  buyInstrumentId,
  paymentInstrumentId,
  session
) {
  return generateQuote(
    quantity,
    buyInstrumentId,
    paymentInstrumentId,
    session.entityId,
    session.token
  ).then((quote) => {
    const url = apiHost + "/order/buy/";
    const body = JSON.stringify({
      entity_id: session.entityId,
      profile_id: session.profileId,
      quote_id: quote.quote_id,
      unlocking_key: session.unlockingKey,
      mfa_code: "",
      activity_id: "",
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
              reject(new Error(parsed.message || "Buy order failed"));
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

module.exports = { placeBuyOrder };
