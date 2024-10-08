const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const CodeSubmission = require('../models/CodeSubmission');

// Compile Python code
router.post('/python', async (req, res) => {
  const { code } = req.body;
  exec(`python3 -c "${code}"`, (error, stdout, stderr) => {
    if (error) {
      return res.status(400).json({ error: stderr });
    }
    // Save code submission
    const newCode = new CodeSubmission({ language: 'python', code });
    newCode.save();

    res.json({ output: stdout });
  });
});

// Compile C++ code
router.post('/cpp', async (req, res) => {
  const { code } = req.body;
  exec(`g++ -o output && ./output`, (error, stdout, stderr) => {
    if (error) {
      return res.status(400).json({ error: stderr });
    }
    // Save code submission
    const newCode = new CodeSubmission({ language: 'cpp', code });
    newCode.save();

    res.json({ output: stdout });
  });
});

module.exports = router;
