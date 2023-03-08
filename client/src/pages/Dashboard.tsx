import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_STATISTICS } from "../redux/types";

export const Dashboard = () => {
  const CardContainer = styled.div`
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 200px;
    height: 150px;
    margin-right: 40px;
  `;

  const TotalNumber = styled.h1`
    color: #333;
    font-size: 48px;
    font-weight: bold;
    margin: 0;
  `;

  const Container = styled.div`
  display:flex;
  flex-direction :  row;
  align-items;center;
  justify-content:center
  `;
  const { data, loading, error } = useSelector((state: any) => state);
  console.log(data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_STATISTICS });
  }, [dispatch]);

  return (
    <div>
      <>
        <h2>Dashboard</h2>
        {error ? <p>{error}</p> : null}
        <Container>
          <CardContainer>
            <p>Total Songs</p>
            <TotalNumber>{data?.data?.counts?.songsCount}</TotalNumber>
          </CardContainer>
          <CardContainer>
            <p>Total Artists</p>
            <TotalNumber>{data?.data?.counts?.artistCount}</TotalNumber>
          </CardContainer>
          <CardContainer>
            <p>Total Albums</p>
            <TotalNumber>{data?.data?.counts?.albumsCount}</TotalNumber>
          </CardContainer>
          <CardContainer>
            <p>Total Genres</p>
            <TotalNumber>{data?.data?.counts?.genresCount}</TotalNumber>
          </CardContainer>
        </Container>
      </>
    </div>
  );
};
