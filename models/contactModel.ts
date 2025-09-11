import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  course?: string;
  location?: string;
}

const contactSchema = new Schema<IContact>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    course: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);

export default Contact;
