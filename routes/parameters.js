const express = require('express');
const auth = require('../middleware/auth');
const Parameter = require('../models/Parameter');
const router = express.Router();

router.post('/', auth(['admin', 'pakar']), async (req, res) => {
  const { name, values } = req.body;

  try {
    const parameter = new Parameter({
      name,
      values
    });

    await parameter.save();
    res.json(parameter);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
  try {
    const parameters = await Parameter.find();
    res.json(parameters);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
