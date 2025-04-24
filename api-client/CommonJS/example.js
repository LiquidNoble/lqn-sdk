const { authenticate } = require("./authenticate");
const { placeBuyOrder } = require("./buy_order");
const { placeTransferOrder } = require("./transfer_order");
const {
  exampleUsername,
  examplePassword,
  instrumentNobleGold,
  instrumentNobleAUD,
} = require("./config");

// CLI argument parsing
const args = process.argv.slice(2).map((arg) => arg.toLowerCase());
const runBuyOrder = args.includes("--buy");
const runTransferOrder = args.includes("--transfer") || args.length === 0;
const toArg = args.find((arg) => arg.startsWith("--to="));
const counterparty = toArg ? toArg.split("=")[1] : "liquidnoble@lqn.app";
const amountArg = args.find((arg) => arg.startsWith("--amount="));
const amount = amountArg ? parseFloat(amountArg.split("=")[1]) : 0.000005;

authenticate(exampleUsername, examplePassword)
  .then((session) => {
    console.log("Authenticated.");

    const actions = [];

    if (runBuyOrder) {
      actions.push(
        placeBuyOrder(1.5, instrumentNobleGold, instrumentNobleAUD, session)
          .then((result) => {
            console.log("✅ Buy Order Success:", result);
          })
          .catch((error) => {
            console.error("❌ Buy Order Error:", error.message);
          })
      );
    }

    if (runTransferOrder) {
      actions.push(
        placeTransferOrder(amount, session, counterparty)
          .then((result) => {
            console.log("✅ Transfer Order Success:", result);
          })
          .catch((error) => {
            console.error("❌ Transfer Order Error:", error.message);
          })
      );
    }

    return Promise.all(actions);
  })
  .catch((error) => {
    console.error("❌ Authentication Error:", error.message);
  });
