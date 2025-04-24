import { apiHost, apiKey, instrumentNobleGold } from "./config.mjs";
import { generateQuote } from "./quotes.mjs";

/**
 * Places a transfer order for the specified quantity of NobleGold to a counterparty.
 *
 * @param {number} quantity - Amount of NobleGold to send
 * @param {Object} session - Auth session
 * @param {string} counterpartyHandle - Recipient's LQN handle
 * @returns {Promise<Object>}
 */
export async function placeTransferOrder(
  quantity,
  session,
  counterpartyHandle = "liquidnoble@lqn.app"
) {
  const quote = await generateQuote(
    quantity,
    null,
    instrumentNobleGold,
    session.entityId,
    session.token,
    4,
    counterpartyHandle
  );

  const url = apiHost + "/order/transfer/";
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
    memo: "Transfer via SDK CLI",
  });

  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Transfer order failed");
  return data;
}
