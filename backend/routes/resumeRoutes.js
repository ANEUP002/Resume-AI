const express = require('express');
const router = express.Router();
const { generateResume } = require('../services/resumeService');

router.post('/generate', async (req, res) => {
  try {
    const { personalInfo, jobDescription } = req.body;
    
    // Validate input
    if (!personalInfo || !jobDescription) {
      return res.status(400).json({ 
        error: 'Missing required fields: personalInfo or jobDescription' 
      });
    }

    const result = await generateResume(personalInfo, jobDescription);
    res.json(result);
  } catch (error) {
    console.error('Route Error:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router; 