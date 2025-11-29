// Admin routes removed — placeholder to avoid errors while files are cleaned up.
import express from 'express';
const router = express.Router();
router.use((req, res) => res.status(404).json({ message: 'Admin routes removed' }));
export default router;
