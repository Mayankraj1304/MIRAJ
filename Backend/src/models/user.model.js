import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: {
        values: ['seller', 'buyer'],
        message: '{VALUE} is not a valid role. Must be either seller or buyer.',
      },
      default: 'buyer',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

const User = mongoose.model('User', userSchema);

export default User;