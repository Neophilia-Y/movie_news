import React from "react";
import styled from "styled-components";
import "./Loader.css";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;



export default () => (
  <Container>
    <div className="loading">Loading&#8230;</div>
  </Container>
);
