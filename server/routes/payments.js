import express from 'express';
import { createPayment, listPayments, merchantInfo } from '../controllers/paymentController.js';

const router = express.Router();

// POST /api/payments (create a payment record)
router.post('/', createPayment);
// GET /api/payments/info - returns merchant UPI / basic info
router.get('/info', merchantInfo);

// GET /api/payments (list recent payments) — useful for admin/debug
router.get('/', listPayments);

export default router;
