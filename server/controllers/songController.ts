const Song = require("../models/Song");
import { NextFunction, Request, Response } from "express";
import {
  CreateSong,
  getSongs,
  getSong,
  UpdateSong,
  DeleteSong,
} from "../services/song";
import { filterQuery } from "../utils/filterQuery";
import { songSchema } from "../utils/validator";

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, album, artist, genre } = req.body;

    if (!title || !album || !artist || !genre) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }
    const validated = await songSchema.validateAsync(req.body);
    const song = await CreateSong(validated);

    return res.status(200).json({
      success: true,
      message: "song created successfully",
      data: { song },
    });
  } catch (error: any) {
    console.log(error);
    return error;
  }
};

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    //accepting query parameters
    const query = req.query as any;
    const filter = await filterQuery(query);
    const songs = await getSongs(filter);
    return res.status(200).json({
      success: true,
      message: "songs",
      count: songs.length,
      data: { songs },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const GetSong = async (req: Request, res: Response) => {
  try {
    const { songId } = req.params;
    const song = await getSong(songId);

    if (!song) {
      return res.status(400).json({
        message: "there is no song in this id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "song",
      data: { song },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const updateSong = async (req: Request, res: Response) => {
  try {
    const { songId } = req.params;
    const song = await getSong(songId);
    console.log(req.body);
    if (!song) {
      return res.status(400).json({
        message: "there is no song in this id",
      });
    }
    const validated = await songSchema.validateAsync(req.body);
    const songToUpdate = await UpdateSong(validated, songId);
    return res.status(200).json({
      success: true,
      message: "song updated successfully",
      data: { songToUpdate },
    });
  } catch (error: any) {
    return error.message;
  }
};

export const deleteSong = async (req: Request, res: Response) => {
  try {
    const { songId } = req.params;

    const song = await getSong(songId);
    if (!song) {
      return res.status(400).json({
        message: "there is no song in this id",
      });
    }

    await DeleteSong(songId);

    return res.status(200).json({
      success: true,
      message: "A song deleted successfully",
    });
  } catch (error: any) {
    return error.message;
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const albumsCount = await (await Song.distinct("Album")).length;
    const genresCount = await (await Song.distinct("Genre")).length;
    const artistCount = await (await Song.distinct("Artist")).length;
    const songsCount = await Song.find().count();
    const counts = {
      artistCount: artistCount,
      albumsCount: albumsCount,
      genresCount: genresCount,
      songsCount: songsCount,
    };
    return res.status(200).json({
      success: true,
      data: { counts },
    });
  } catch (error) {
    return error;
  }
};
