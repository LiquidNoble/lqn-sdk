const https = require("https");
const { apiHost, apiKey } = require("./config");

/**
 * Generate a quote for an order (buy, sell, transfer, etc.).
 *
 * @param {number} quantity
 * @param {string|null} orderInstrumentId
 * @param {string} paymentInstrumentId
 * @param {string} entityId
 * @param {string} token - JWT
 * @param {number} [orderType=1] - Order type (1 = Buy, 4 = Transfer, etc.)
 * @param {string|null} [counterpartyHandle] - e.g. "liquidnoble@lqn.app"
 * @returns {Promise<Object>}
 */
function generateQuote(
  quantity,
  orderInstrumentId,
  paymentInstrumentId,
  entityId,
  token,
  orderType = 1,
  counterpartyHandle = null
) {
  const url = apiHost + "/order/price/";
  const body = JSON.stringify({
    quantity,
    order_instrument_id: orderInstrumentId,
    payment_instrument_id: paymentInstrumentId,
    entity_id: entityId,
    order_type: orderType,
    counterparty_handle: counterpartyHandle,
  });

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
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
            reject(new Error(parsed.message || "Quote generation failed"));
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
}

module.exports = { generateQuote };
