const Feedback = require('../models/Feedback');
const Query = require('../models/Query');
const sendEmail = require('../utils/emailService');

// @desc    Submit feedback
// @route   POST /api/utilities/feedback
// @access  Public
const submitFeedback = async (req, res) => {
  try {
    const { name, phone, rating, feedback } = req.body;

    const newFeedback = new Feedback({
      name,
      phone,
      rating,
      feedback,
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all feedbacks
// @route   GET /api/utilities/feedback
// @access  Public (Only approved for public, all for admin)
const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ status: 'Approved' }).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit a query/doubt
// @route   POST /api/utilities/query
// @access  Public
const submitQuery = async (req, res) => {
  try {
    const { name, phone, email, question } = req.body;

    const newQuery = new Query({
      name,
      phone,
      email,
      question,
    });

    const savedQuery = await newQuery.save();

    // Send email to Admin
    await sendEmail({
      email: process.env.ADMIN_EMAIL || 'dhanushthm13@gmail.com',
      subject: 'New Doubt/Query Submitted - Apply Pannu Bro',
      message: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nQuestion: ${question}`,
    });

    res.status(201).json(savedQuery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitFeedback,
  getFeedbacks,
  submitQuery,
};
