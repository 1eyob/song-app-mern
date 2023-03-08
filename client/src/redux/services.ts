import axios from "axios";

axios.defaults.baseURL = "https://song-app-mern1.onrender.com/api/v1";

// get all songs with filter queries
const getAllSongs = async () =>
  axios.get(
    `/song/?filters=[{"columnField":"Artist","operatorValue":"=","value":"NF"}]`
  );

export const GetAll = async () => axios.get("/song");

export const Get = async (id) => axios.get(`/song/${id}`);

export const Create = async (song) => axios.post(`/song`, song);

export const Update = async (song, songId) =>
  axios.patch(`/song/${songId}`, song);

export const Delete = async (songId) => axios.delete(`/song/${songId}`);

export const login = async (user) => axios.post("/auth/login", user);

export const getCounts = async () => axios.get("/song/songs/statistics/get");
