import React, { FC } from "react";
import styled from "styled-components";

const Loader: FC = () => {
  return (
    <SpinnerContainer>
      <Spinner className={"loader"} />
    </SpinnerContainer>
  );
};

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #00000076;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const SpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loader;
