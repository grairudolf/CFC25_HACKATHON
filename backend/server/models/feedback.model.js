import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'], // Basic email validation
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  message: {
    type: String,
    required: [true, 'Message is required.'],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

export default FeedbackModel;
