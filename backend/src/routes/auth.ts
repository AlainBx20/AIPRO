import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email and password are required' 
    });
  }

  // For demo purposes, accept any email/password
  // In a real app, you would validate against a database
  const token = 'demo-token-' + Date.now();
  
  res.json({
    success: true,
    token,
    user: {
      email
    }
  });
});

export default router; 