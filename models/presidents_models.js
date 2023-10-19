import mongoose from "mongoose";

const presidentsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  description: {
    type: String,
  },
  ideology: {
    type: String,
  },
  status: {
    type: Boolean,
  },
});

export default mongoose.model("President", presidentsSchema);
