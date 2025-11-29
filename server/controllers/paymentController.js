import Payment from '../models/Payment.js';
import fs from 'fs/promises';
import path from 'path';
import mongoose from 'mongoose';

const STORE = path.resolve(new URL('..', import.meta.url).pathname, 'data', 'payments.json');

async function readLocal() {
  try {
    const raw = await fs.readFile(STORE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

async function writeLocal(list) {
  await fs.mkdir(path.dirname(STORE), { recursive: true }).catch(() => {});
  await fs.writeFile(STORE, JSON.stringify(list, null, 2));
}

// Create a new payment record. We validate that the amount matches the sum
// of items (price * qty) if items are provided. This prevents accidental
// over/under reporting of the payable amount from client-side tampering.
export const createPayment = async (req, res) => {
  try {
    const { userEmail, upiId, amount, items = [], delivery = {} } = req.body;

    if (!userEmail || !upiId || typeof amount !== 'number') {
      return res.status(400).json({ message: 'userEmail, upiId and amount are required' });
    }

    // If items are supplied, validate server-side sum equals amount
    if (items && items.length > 0) {
      const serverSum = items.reduce((acc, it) => acc + ((it.price || 0) * (it.qty || 1)), 0);
      if (Math.round(serverSum) !== Math.round(amount)) {
        return res.status(400).json({ message: 'Amount does not match cart total' });
      }
    }

    // If mongoose isn't connected, persist locally so dev without DB still works
    if (mongoose.connection.readyState !== 1) {
      const list = await readLocal();
      const payment = { _id: `${Date.now()}`, userEmail, upiId, amount, items, delivery, status: 'paid', createdAt: new Date().toISOString() };
      list.unshift(payment);
      await writeLocal(list);
      return res.status(201).json({ message: 'Payment recorded (local)', payment });
    }

    const payment = new Payment({ userEmail, upiId, amount, items, delivery, status: 'paid' });
    await payment.save();

    return res.status(201).json({ message: 'Payment recorded', payment });
  } catch (err) {
    console.error('Error creating payment:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// (Optional) list payments — useful for debugging/verification
export const listPayments = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const list = await readLocal();
      return res.json(list.slice(0, 100));
    }

    const payments = await Payment.find().sort({ createdAt: -1 }).limit(100);
    res.json(payments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const merchantInfo = async (req, res) => {
  // Expose a simple object containing merchant UPI and optional info
  return res.json({ upiId: process.env.MERCHANT_UPI || 'merchant@upi', name: process.env.MERCHANT_NAME || 'Handloom' });
};
