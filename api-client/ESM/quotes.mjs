import { apiHost, apiKey } from './config.mjs';

/**
 * Generate a quote for an order (buy, sell, transfer, etc.).
 */
export function generateQuote(quantity, orderInstrumentId, paymentInstrumentId, entityId, token, orderType = 1, counterpartyHandle = null) {
  const url = apiHost + '/order/price/';
  const body = JSON.stringify({
    quantity,
    order_instrument_id: orderInstrumentId,
    payment_instrument_id: paymentInstrumentId,
    entity_id: entityId,
    order_type: orderType,
    counterparty_handle: counterpartyHandle
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  return fetch(url, {
    method: 'POST',
    headers,
    body
  })
    .then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Quote generation failed');
      return data;
    });
}
