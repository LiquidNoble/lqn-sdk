import { authenticate } from './authenticate.mjs';
import { placeBuyOrder } from './buy_order.mjs';
import { placeTransferOrder } from './transfer_order.mjs';
import {
  exampleUsername,
  examplePassword,
  instrumentNobleGold,
  instrumentNobleAUD
} from './config.mjs';

// CLI argument parsing
const args = process.argv.slice(2).map(arg => arg.toLowerCase());
const runBuyOrder = args.includes('--buy');
const runTransferOrder = args.includes('--transfer') || args.length === 0;
const toArg = args.find(arg => arg.startsWith('--to='));
const counterparty = toArg ? toArg.split('=')[1] : 'liquidnoble@lqn.app';
const amountArg = args.find(arg => arg.startsWith('--amount='));
const amount = amountArg ? parseFloat(amountArg.split('=')[1]) : 0.000005;

const session = await authenticate(exampleUsername, examplePassword);
console.log('Authenticated.');

if (runBuyOrder) {
  try {
    const result = await placeBuyOrder(1.5, instrumentNobleGold, instrumentNobleAUD, session);
    console.log('✅ Buy Order Success:', result);
  } catch (err) {
    console.error('❌ Buy Order Error:', err.message);
  }
}

if (runTransferOrder) {
  try {
    const result = await placeTransferOrder(amount, session, counterparty);
    console.log('✅ Transfer Order Success:', result);
  } catch (err) {
    console.error('❌ Transfer Order Error:', err.message);
  }
}
