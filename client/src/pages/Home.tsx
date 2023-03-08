import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { GET_SONGS } from "../redux/types";

const Home = () => {
  const { data, error } = useSelector((state: any) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_SONGS });
  }, [dispatch]);

  return (
    <div>
      {error ? <p>{error}</p> : null}
      <Card data={data?.data?.songs} />
    </div>
  );
};

export default Home;
