import mongoose from "mongoose";

const ChecklistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  note: {
    type: Object,
    require: true,
  },
  general: {
    type: Boolean,
    require: true,
  },
});

export default mongoose.model("Checklist", ChecklistSchema);
