// Configuration for Liquid Noble API SDK (ESM)

export const isTestMode = true;

export const apiHost = isTestMode
  ? "https://api.dev.liquidnoble.com/v1"
  : "https://api.liquidnoble.com/v1";

export const apiKey =
  "141e7dd2373bb410e33f3d8150f722003c0260ccef79972c47da6bf61839dba3";

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
export const exampleUsername = "example@liquidnoble.com";
export const examplePassword = "4%eWqHvzyTWaZzpZ2LvzPE*N";

export const instrumentNobleGold = "CRNGqhWorBpqaZBe1kp1FUfGcQZMN1AEyoyk";
export const instrumentNobleAUD = "CRNL6AEFhB8PBjbNN4WbbEHT39YZqEvJQuAF";
