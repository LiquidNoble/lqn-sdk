# Liquid Noble API SDK (Node.js, CommonJS)

This is a lightweight, modular SDK to interact with [Liquid Noble's API](https://liquidnoble.com), written in plain JavaScript using **CommonJS modules**. It supports authentication, quote generation, buy orders, and token transfers — all without requiring a `package.json` or extra dependencies.

---

## 🔧 Structure

```
CommonJS/
├── config.js             # Global config, API keys, credentials, and instrument IDs
├── authenticate.js       # Authenticates with the API (returns JWT and unlocking key)
├── quotes.js             # Generates order quotes (buy, sell, transfer)
├── buy_order.js          # Submits a Buy order using a generated quote
├── transfer_order.js     # Submits a Transfer order using a generated quote
└── example.js            # Entry script (CLI-enabled) to run buy or transfer orders
```

---

## 🚀 Setup

No installation or `npm` needed. Just clone or copy the files and run with Node.js 16+:

```bash
node example.js
```

---

## 🔐 Configuration

Edit `config.js` to:

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
node example.js
```

or

```bash
node example.js --transfer
```

This sends **0.000005 NobleGold** to `liquidnoble@lqn.app`.

You can override the default recipient and amount using CLI arguments:

```bash
node example.js --transfer --to=noble-customer@lqn.app --amount=0.01
```

This would send **0.01 NobleGold** to `noble-customer@lqn.app` instead.

> 💡 NobleGold is the default instrument for transfers, but you can change this in `config.js` to support other instruments.

---

### 💰 Run a buy order

```bash
node example.js --buy
```

This places a buy order for **1.5 NobleGold** paid with **NobleAUD**.

---

### 🔁 Run both buy and transfer in one go

```bash
node example.js --buy --transfer
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
