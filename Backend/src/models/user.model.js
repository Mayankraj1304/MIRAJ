import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      default: 'buyer',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', userSchema);

export default User;