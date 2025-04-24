# Liquid Noble API SDK (Node.js, ESM)

This is a lightweight, modular SDK to interact with [Liquid Noble's API](https://liquidnoble.com), written in modern **ECMAScript Modules (ESM)** using native JavaScript. It supports authentication, quote generation, buy orders, and token transfers — all without requiring external dependencies or `npm install`.

---

## 🔧 Structure

```
ESM/
├── config.mjs             # Global config, API keys, credentials, and instrument IDs
├── authenticate.mjs       # Authenticates with the API (returns JWT and unlocking key)
├── quotes.mjs             # Generates order quotes (buy, sell, transfer)
├── buy_order.mjs          # Submits a Buy order using a generated quote
├── transfer_order.mjs     # Submits a Transfer order using a generated quote
└── example.mjs            # Entry script (CLI-enabled) to run buy or transfer orders
```

---

## 🚀 Setup

No installation needed. Just make sure you're running **Node.js 18+**, then:

```bash
node example.mjs
```

Or use CLI flags to control which order to submit.

> ⚠️ If using Node.js 16, add `"type": "module"` to your `package.json`, or upgrade to Node.js 18+ which has full ESM support out of the box.

---

## 🔐 Configuration

Edit `config.mjs` to:

- Set your **API key**
- Toggle between **test** and **production** environments
- Set example credentials
- Specify hardcoded instrument IDs (or dynamically fetch them)

```js
export const apiKey = "your-api-key-here";
export const isTestMode = true; // Use Sandbox
```

> ⚠️ For production, replace hardcoded values with secrets loaded securely (e.g., from environment variables or a secrets manager like AWS Secrets Manager).

---

## 💻 CLI Usage

You can control which operation to run from the CLI using flags:

### ✅ Run a transfer order (default)

```bash
node example.mjs
```

or

```bash
node example.mjs --transfer
```

This sends **0.000005 NobleGold** to `liquidnoble@lqn.app`.

You can override the default recipient and amount using CLI arguments:

```bash
node example.mjs --transfer --to=noble-customer@lqn.app --amount=0.01
```

This would send **0.01 NobleGold** to `noble-customer@lqn.app` instead.

> 💡 NobleGold is the default instrument for transfers, but you can change this in `config.mjs` to support other instruments.

---

### 💰 Run a buy order

```bash
node example.mjs --buy
```

This places a buy order for **1.5 NobleGold** paid with **NobleAUD**.

---

### 🔁 Run both buy and transfer in one go

```bash
node example.mjs --buy --transfer
```

---

## 🧪 Testing

Make sure your API key is authorized for the **Dev (sandbox)** environment if using `isTestMode = true`.

You can view all available endpoints in the [OpenAPI spec](https://liquidnoble.com/api-reference/).

---

## 📦 Next Steps

You can extend the SDK to support:

- Sell orders
- Redemption orders (withdrawals)
- Lockbox management
- Token refresh
- Automatic retry / rate limit handling

Need help scaffolding these features or want to request additional functionality?  
Contact us at 📬 **[hello@liquidnoble.com](mailto:hello@liquidnoble.com)** or fork the repo and build your own! 🛠️

---

## 🛡 Disclaimer

This SDK is provided as-is for integration and demonstration purposes. Please handle credentials and sensitive keys securely in production environments.
