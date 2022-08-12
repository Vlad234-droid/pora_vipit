import React, { useEffect, Dispatch, FC, SetStateAction, useRef } from "react";
import styled from "styled-components";

const Burger: FC<{
  onClick: Dispatch<SetStateAction<boolean>>;
  toggle: boolean;
}> = ({ onClick, toggle }) => {
  const ref = useRef();

  useEffect(() => {
    if (!toggle) {
      //@ts-ignore
      ref.current.checked = false;
    }
  }, [toggle]);

  return (
    <Container className={"burger"} onClick={onClick}>
      {/*// @ts-ignore*/}
      <input className="checkbox" type="checkbox" ref={ref} />
      <div className="hamburger-lines">
        <span className="line line1" />
        <span className="line line2" />
        <span className="line line3" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: block;
  position: relative;
  height: 60px;
  width: 60px;
  .checkbox {
    position: absolute;
    display: block;
    height: 32px;
    width: 32px;
    top: 11px;
    left: 13px;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
  }
  input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
    transform: rotate(45deg);
  }

  input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
    transform: scaleY(0);
  }

  input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
    transform: rotate(-45deg);
  }
  .hamburger-lines {
    height: 26px;
    width: 32px;
    position: absolute;
    top: 14px;
    left: 13px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .line {
      display: block;
      height: 4px;
      width: 100%;
      border-radius: 10px;
      background: white;
    }
    .line1 {
      transform-origin: 0 0;
      transition: transform 0.4s ease-in-out;
    }

    .line2 {
      transition: transform 0.2s ease-in-out;
    }

    .line3 {
      transform-origin: 0 100%;
      transition: transform 0.4s ease-in-out;
    }
  }
`;

export default Burger;
