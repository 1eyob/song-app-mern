import React, { useState } from "react";
import styled from "@emotion/styled";
import Modal from "./ Modal";
import Form from "./Form";
import { useNavigate } from "react-router-dom";


const CardContainer = styled.div`
  background-color: #fefffc;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 250px;
  height: 170px;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardTitle = styled.h2`
  color: #333;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const CardText = styled.p`
  color: #666;
  font-size: 16px;
  margin-top: 8px;
`;

const SongAlbum = styled.p`
  color: #666;
  font-size: 20px;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 80vw;
  padding: 20px;
  margin-left: 10px;
  margin-top: 0;
`;
const SongContainer = styled.div`
  margin-left: 8px;
  display: flex;
  flex-direction: column;
`;
const SongGenre = styled.div`
  color: #666;
  font-size: 16px;
  margin-top: 5px;
  color: black;
`;
const EditButton = styled.button`
  background-color: #007bb2;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
`;
export const DeleteButton = styled.button`
  background-color: red;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  border-radius: 8px;
  cursor: pointer;
`;
export const ButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const AddButton = styled.div`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 12px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #3e8e41;
  }
  margin-left: 20px;
`;
const LargeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const FilterComponent = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
`;
const AddButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const DashBoardButton = styled.div`
  background-color: #007bb2;
  border: none;
  margin-top: 10px;
  color: white;
  padding: 12px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: blue;
  }
  margin-left: 20px;
`;

const Card = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [item, setItem] = useState({});
  const handleOpenModal = () => {
    setModalMode("Add/Edit");
    setMethod("Add");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const [method, setMethod] = useState("");
  const [modalMode, setModalMode] = useState("");

  const handleEditModal = (item) => {
    setItem(item);
    setMethod("Edit");
    setModalMode("Add/Edit");
    setIsModalOpen(true);
  };

  const handleDeleteModal = (item) => {
    setItem(item);
    setModalMode("Delete");
    setIsModalOpen(true);
  };
  const navigate = useNavigate();
  return (
    <Box>
      <FilterComponent>
        {/* <Filter options={"emotions"} onSelect={handleSelect} /> */}
      </FilterComponent>
      <LargeContainer>
        <AddButtonContainer>
          <AddButton onClick={handleOpenModal}>Add</AddButton>
          <DashBoardButton onClick={() => navigate("/dashboard")}>
            Dashboard
          </DashBoardButton>
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            mode={modalMode}
            data={item}
          >
            <Form data={item} mode={method} />
          </Modal>
        </AddButtonContainer>
        <Container>
          {data?.map((item: any) => (
            <CardContainer>
              <CardTitle>{item.Title}</CardTitle>
              <SongContainer>
                <CardText>{item.Album}</CardText>
                <SongAlbum>{item.Artist}</SongAlbum>
                <SongGenre>{item.Genre}</SongGenre>
                <ButtonContainer>
                  <EditButton onClick={() => handleEditModal(item)}>
                    Edit
                  </EditButton>
                  <DeleteButton onClick={() => handleDeleteModal(item)}>
                    Delete
                  </DeleteButton>
                </ButtonContainer>
              </SongContainer>
            </CardContainer>
          ))}
        </Container>
      </LargeContainer>
    </Box>
  );
};

export default Card;
