// adminAuth middleware removed — admin portal disabled. Returning 404 for admin protected routes.
export const adminAuth = (req, res, next) => res.status(404).json({ message: 'Admin functionality removed' });
