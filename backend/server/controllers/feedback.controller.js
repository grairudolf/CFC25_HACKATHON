import FeedbackModel from '../models/feedback.model.js';
import { Logs_palette } from '../palette/index.js'; // Assuming this is used for logging consistently

export const submitFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    // Basic validation (message is required by schema, email format by schema)
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const newFeedback = new FeedbackModel({
      name,
      email,
      rating,
      message,
    });

    await newFeedback.save();

    console.log(`${ Logs_palette.caption("[_server]") } New feedback submitted: ${ Logs_palette.success(newFeedback._id) }`);
    res.status(201).json({ success: true, message: 'Feedback submitted successfully!', feedback: newFeedback });

  } catch (error) {
    console.error(`${ Logs_palette.caption("[_server]") } Error submitting feedback: ${ Logs_palette.error(error.message) }`);
    if (error.name === 'ValidationError') {
      // Extract validation messages
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error while submitting feedback.' });
  }
};
