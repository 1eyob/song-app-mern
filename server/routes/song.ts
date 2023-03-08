import express from "express";
const router = express.Router();
import {
  createSong,
  getAllSongs,
  updateSong,
  deleteSong,
  GetSong,
  getStatistics,
} from "../controllers/songController";

router.route("/").post(createSong).get(getAllSongs);
router.route("/:songId").patch(updateSong).get(GetSong).delete(deleteSong);
router.get("/songs/statistics/get", getStatistics);

export default router;
