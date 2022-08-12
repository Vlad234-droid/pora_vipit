import React, { useEffect, FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import styled, { css } from "styled-components";
//@ts-ignore
import eye from "assets/img/eye.png";

enum MODE {
  HIDE = "HIDE",
}

type Props = Pick<UseFormReturn, "setValue"> & {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  onChange?: (value: string) => void;
  error?: string | undefined;
};

const Input: FC<Props> = ({
  type,
  placeholder,
  name,
  onChange,
  value = "",
  setValue,
  error,
}) => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const [mode, setMode] = useState<string | null>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange && onChange(value);
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <InputContainer>
      <InputStyle
        type={mode ? "text" : type}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        value={currentValue}
        error={error}
      />
      {(name === "password" || name === "confirmPassword") && (
        <EyeStyle onClick={() => setMode(!mode ? MODE.HIDE : null)}>
          <EyeImg src={eye} alt="eye" />
          <CloseLine mode={mode} />
        </EyeStyle>
      )}
    </InputContainer>
  );
};

const CloseLine = styled.div`
  ${({ mode }) =>
    mode !== MODE.HIDE &&
    css`
      display: none;
    `}
  position: absolute;
  top: -2px;
  right: 10px;
  background: var(--color-violet);
  width: 4px;
  height: 32px;
  border-radius: 4px;
  transform: rotate(51deg);
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;
const EyeStyle = styled.div`
  position: absolute;
  right: 16px;
  bottom: 9px;
  cursor: pointer;
  width: 26px;
`;
const EyeImg = styled.img`
  filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(305deg)
    brightness(103%) contrast(103%);
  width: 100%;
`;

const InputStyle = styled.input`
  background: transparent;
  padding: 1rem;
  border: 0.1rem solid var(--color-light-blue);
  border-radius: 0.4rem;
  color: white;
  width: 100%;
  font-size: 1rem;
  transition: border 0.3s ease;
  position: relative;
  ${({ error }) =>
    error &&
    css`
      border: 0.1rem solid red;
    `}
  ${({ name }) =>
    (name === "password" || name === "confirmPassword") &&
    css`
      padding-right: 60px;
    `}
  &:focus {
    border: 0.1rem solid #997af0;
    outline: none;
  }
`;

export default Input;
