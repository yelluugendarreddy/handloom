import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  upiId: { type: String, required: true },
  amount: { type: Number, required: true },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  delivery: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
