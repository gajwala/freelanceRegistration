import mongoose from "mongoose";

const configSchema = mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  gender: { type: String, required: false },
  dob: { type: String, required: false },
});

export default mongoose.model("Config", configSchema);
