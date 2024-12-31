import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [40, "Maximum Name Length is 40."],
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    // cart: {
    //   type: [{ productId: mongoose.Schema.Types.ObjectId, quantity: Number }],
    //   default: [],
    // },
    lastLogin: { type: Date, default: Date.now() },
    isVerified: { type: Boolean, default: false },
    resetPasswordCode: String,
    resetPasswordCodeExpiration: Date,
    verificationToken: String,
    verificationTokenExpiration: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
