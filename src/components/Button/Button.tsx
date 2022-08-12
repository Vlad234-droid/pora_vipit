import React, { FC, CSSProperties } from "react";
import styled, { css } from "styled-components";

type Props = {
  onClick: () => void;
  text: string;
  styles?: CSSProperties | null;
};

export const Button: FC<Props> = ({ onClick, text, styles = null }) => {
  return (
    <ButtonStyled
      styles={styles}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  max-width: 300px;
  background: #997af0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: background 0.3s ease;
  &:hover {
    background: #3e0eff;
  }
  &:disabled {
    background: #3e0eff;
    opacity: 0.5;
    cursor: default;
  }
  ${({ styles }) =>
    styles &&
    css`
      ${styles}
    `}
  }
    
`;
