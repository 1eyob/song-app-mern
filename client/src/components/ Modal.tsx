/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { DELETE_SONG_BY_ID } from "../redux/types";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid red;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const DeleteModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 17vh;
  width: 50vh;
  border: 1px solid green;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;
const DeleteButton = styled.div`
  background-color: red;
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  height: 70vh;
  width: 50vh;
  border: 1px solid green;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, children, mode, data }) => {
  if (!isOpen) {
    return null;
  }

  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log(data._id, mode);
    if (data._id && mode === "Delete") {
      dispatch({ type: DELETE_SONG_BY_ID, id: data._id });
    }
  };

  return (
    <>
      {mode === "Add/Edit" ? (
        <Overlay>
          <ModalContainer>
            <CloseButton onClick={onClose}>×</CloseButton>
            {children}
          </ModalContainer>
        </Overlay>
      ) : (
        <Overlay>
          <DeleteModalContainer>
            <CloseButton onClick={onClose}>×</CloseButton>
            <h4>Are you want to sure to delete - "{data.Title}"</h4>
            <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
          </DeleteModalContainer>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
