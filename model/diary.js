const mongoose = require("mongoose");

const diarySchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "should have some text"],
  },
  heading: {
    type: String,
    required: [true, "diary should have some heading"],
  },
  date: Date,
});
const diary = mongoose.model("diary", diarySchema);
module.exports = diary;
