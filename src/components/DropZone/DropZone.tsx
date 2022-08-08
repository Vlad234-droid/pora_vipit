import React, { FC, InputHTMLAttributes, useRef, CSSProperties } from "react";
import styled from "styled-components";
import { convertToBase64 } from "utils";

interface DropZoneProps extends InputHTMLAttributes<HTMLInputElement> {
  onUpload: (file: File) => void;
  styles?: CSSProperties;
}

export const DropZone: FC<DropZoneProps> = ({
  children,
  onUpload,
  accept,
  styles,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target?.files?.[0];
    const current = inputRef.current;
    //@ts-ignore
    const base64 = await convertToBase64(file);
    if (file) {
      //@ts-ignore
      onUpload(base64);
    }
    if (current) {
      current.value = "";
    }
  };

  return (
    <div
      style={{ ...styles, position: "relative", border: "1px dashed #00539f" }}
    >
      <LabelStyle htmlFor="DropZone">
        <InputStyle
          type="file"
          id="DropZone"
          ref={inputRef}
          onChange={handleChange}
          accept={accept}
        />
        {children}
      </LabelStyle>
    </div>
  );
};

const LabelStyle = styled.label`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const InputStyle = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  width: 100%;
  cursor: pointer;
`;

DropZone.displayName = "DropZone";
