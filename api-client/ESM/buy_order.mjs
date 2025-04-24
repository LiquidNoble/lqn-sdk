import { apiHost, apiKey } from "./config.mjs";
import { generateQuote } from "./quotes.mjs";

/**
 * Place a Buy Order
 */
export async function placeBuyOrder(
  quantity,
  buyInstrumentId,
  paymentInstrumentId,
  session
) {
  const quote = await generateQuote(
    quantity,
    buyInstrumentId,
    paymentInstrumentId,
    session.entityId,
    session.token
  );

  const url = apiHost + "/order/buy/";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session.token}`,
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  const body = JSON.stringify({
    entity_id: session.entityId,
    profile_id: session.profileId,
    quote_id: quote.quote_id,
    unlocking_key: session.unlockingKey,
    mfa_code: "",
    activity_id: "",
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Buy order failed");
  return data;
}
