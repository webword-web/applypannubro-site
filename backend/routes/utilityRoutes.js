const express = require('express');
const router = express.Router();
const {
  submitFeedback,
  getFeedbacks,
  submitQuery,
} = require('../controllers/utilityController');

router.route('/feedback')
  .post(submitFeedback)
  .get(getFeedbacks);

router.post('/query', submitQuery);

module.exports = router;
