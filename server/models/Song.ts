import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: [true, "Please provide title of the song"],
  },
  Artist: {
    type: String,
    required: [true, "Please provide Artist"],
  },
  Album: {
    type: String,
    required: [true, "Please provide Album name"],
  },
  Genre: {
    type: String,
    required: [true, "Please provide genre of the song"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Song", SongSchema);
