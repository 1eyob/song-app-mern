import styled from "@emotion/styled";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_SONG, UPDATE_SONG_BY_ID } from "../redux/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80%;
  max-width: 600px;
  background-color: #f2f2f2;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const FormHeader = styled.h2`
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;
const FormLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #333;
`;
const FormInput = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const FormButton = styled.button`
  background-color: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

const Form = (item) => {
  console.log(item);
  const [title, setTitle] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [artist, setArtist] = useState();

  const { data, loading, error } = useSelector((state: any) => state.data);
  const dispatch = useDispatch();

  const songData = {
    title: title,
    artist: artist,
    album: album,
    genre: genre,
  };
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title || artist || genre || album) {
      if (item.mode === "Add") {
        dispatch({ type: CREATE_SONG, song: songData });
        showToastMessage();
      } else {
        console.log(songData);
        dispatch({
          type: UPDATE_SONG_BY_ID,
          song: songData,
          id: item.data._id,
        });
      }
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      {item.mode === "Edit" ? (
        <FormHeader>Edit Song</FormHeader>
      ) : (
        <FormHeader>Add Song</FormHeader>
      )}
      <FormLabel htmlFor="title">Title</FormLabel>
      <FormInput
        type="text"
        defaultValue={item.mode === "Edit" ? item?.data?.Title : ""}
        id="title"
        name="title"
        onChange={(event: any) => setTitle(event.target.value)}
        required
      />
      <FormLabel htmlFor="artist"> Artist </FormLabel>
      <FormInput
        type="text"
        id="artist"
        defaultValue={item.mode === "Edit" ? item?.data?.Artist : ""}
        name="artist"
        onChange={(event: any) => setArtist(event.target.value)}
        required
      />
      <FormLabel htmlFor="album">Album</FormLabel>
      <FormInput
        type="text"
        id="album"
        defaultValue={item.mode === "Edit" ? item?.data?.Album : ""}
        name="album"
        onChange={(event: any) => setAlbum(event.target.value)}
        required
      />
      <FormLabel htmlFor="genre"> Genre </FormLabel>
      <FormInput
        type="text"
        id="genre"
        defaultValue={item.mode === "Edit" ? item?.data?.Genre : ""}
        name="genre"
        onChange={(event: any) => setGenre(event.target.value)}
        required
      />
      {item.mode === "Edit" ? (
        <FormButton>Save</FormButton>
      ) : (
        <FormButton>Add</FormButton>
      )}
    </FormWrapper>
  );
};

export default Form;
