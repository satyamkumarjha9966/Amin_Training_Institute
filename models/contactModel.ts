import { model, Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
    //   required: true,
    },
    quantity: {
      type: Number,
    //   required: true,
      default: 0,
    },
    price: {
      type: Number,
    //   required: true,
    },
    supplier: {
      type: String,
    },
    status: {
      type: String,
      enum: ["in-stock", "out-of-stock", "low-stock"],
      default: "in-stock",
    },
  },
  { timestamps: true }
);

const Contact = model("Contact", contactSchema);

export default Contact;
