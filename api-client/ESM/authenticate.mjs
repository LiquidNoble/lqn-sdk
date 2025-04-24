import { apiHost, apiKey } from './config.mjs';

export function authenticate(username, password) {
  const url = apiHost + '/user/authenticate/';
  const headers = {
    'Content-Type': 'application/json'
  };

  if (apiKey) {
    headers['x-api-key'] = apiKey;
  }

  const body = JSON.stringify({
    username,
    password,
    mfa_code: ''
  });

  return fetch(url, {
    method: 'POST',
    headers,
    body
  })
    .then(async (response) => {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Authentication failed');
      return {
        token: data.token,
        unlockingKey: data.unlocking_key,
        entityId: data.entity_id,
        profileId: data.profile_id,
        lockboxId: data.lockbox_id
      };
    });
}
