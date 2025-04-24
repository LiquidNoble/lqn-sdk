// Configuration for Liquid Noble API SDK (CommonJS)

const isTestMode = true;

const apiHost = isTestMode
  ? 'https://api.dev.liquidnoble.com/v1'
  : 'https://api.liquidnoble.com/v1';

const apiKey = '141e7dd2373bb410e33f3d8150f722003c0260ccef79972c47da6bf61839dba3';

/**
 * Example credentials for testing purposes only.
 * 
 * ⚠️ In real production applications, credentials must never be hardcoded.
 * Instead, they should be securely injected at runtime from a trusted source,
 * such as:
 * - Environment variables loaded by your deployment system
 * - Encrypted configuration stores (e.g., AWS Secrets Manager, HashiCorp Vault)
 * - CI/CD pipelines with secret management (e.g., GitHub Actions, GitLab CI)
 */
const exampleUsername = 'example@liquidnoble.com';
const examplePassword = '4%eWqHvzyTWaZzpZ2LvzPE*N';

// Assign instrument IDs based on environment
const instrumentNobleGold = isTestMode
  ? 'CRNGqhWorBpqaZBe1kp1FUfGcQZMN1AEyoyk'
  : 'CRNMUxdNcHJpphgzimWkbihLWRP2XAM7aczR';

const instrumentNobleAUD = isTestMode
  ? 'CRNL6AEFhB8PBjbNN4WbbEHT39YZqEvJQuAF'
  : 'CRN9KfXwsQUzZSSHXNoLUcyZykD2tmMPrANe';

module.exports = {
  isTestMode,
  apiHost,
  apiKey,
  exampleUsername,
  examplePassword,
  instrumentNobleGold,
  instrumentNobleAUD
};
