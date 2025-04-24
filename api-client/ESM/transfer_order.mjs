import { apiHost, apiKey, instrumentNobleGold } from './config.mjs';
import { generateQuote } from './quotes.mjs';

/**
 * Place a Transfer Order
 */
export async function placeTransferOrder(quantity, session) {
  const quote = await generateQuote(
    quantity,
    null,
    instrumentNobleGold,
    session.entityId,
    session.token,
    4,
    'liquidnoble@lqn.app'
  );

  const url = apiHost + '/order/transfer/';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session.token}`
  };

  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  const body = JSON.stringify({
    entity_id: session.entityId,
    profile_id: session.profileId,
    quote_id: quote.quote_id,
    unlocking_key: session.unlockingKey,
    mfa_code: '',
    activity_id: '',
    memo: 'Transfer test to Liquid Noble'
  });

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Transfer order failed');
  return data;
}
