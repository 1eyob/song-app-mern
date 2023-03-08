const Song = require("../models/Song");

interface song {
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export const CreateSong = async (data: song) => {
  try {
    const song = await Song.create({
      Title: data.title,
      Artist: data.artist,
      Album: data.album,
      Genre: data.genre,
    });

    return song;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSongs = async (filter: any) => {
  try {
    const songs = await Song.find().where(filter).lean();
    return songs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSong = async (songId: string) => {
  try {
    const song = await Song.findById(songId);
    return song;
  } catch (error) {
    throw error;
  }
};
export const UpdateSong = async (data: song, songId: string) => {
  try {
    const song = await Song.findByIdAndUpdate(
      { _id: songId },
      {
        Title: data.title,
        Artist: data.artist,
        Album: data.album,
        Genre: data.genre,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    return song;
  } catch (error) {
    throw error;
  }
};

export const DeleteSong = async (songId: string) => {
  try {
    await Song.findByIdAndDelete({ _id: songId });
  } catch (error) {
    throw error;
  }
};
