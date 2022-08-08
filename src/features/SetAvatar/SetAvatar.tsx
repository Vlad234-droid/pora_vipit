import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { DropZone } from "components/DropZone";
//@ts-ignore
import upload from "assets/img/upload.png";
import { Button } from "components/Button";
import { useAuthContainer } from "context/authContext";
import { Axios } from "api";
import { setAvatarRouter } from "utils/ApiRoutes";
import { toastProps } from "utils";
import { Pages } from "../../config";

const SetAvatar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContainer();

  const [picture, setPicture] = useState(null);
  const onUpload = (file) => setPicture(file);

  const handleSubmit = async () => {
    //@ts-ignore
    const { data } = await Axios(`${setAvatarRouter}/${user._id}`, "post", {
      image: picture,
    });
    if (data.isSet) {
      //@ts-ignore
      setUser({ ...user, isAvatarImageSet: true, avatarImage: data.image });
      navigate(`/${Pages.CHAT}`);
    } else {
      //@ts-ignore
      toast.error("Error setting avatar. Please try again", toastProps);
    }
  };

  return (
    <>
      <Container>
        <div className={"title-container"}>
          <h1>Upload photo to your profile</h1>
        </div>

        {picture && (
          <div className={"avatar"}>
            <img src={picture} alt="avatar" />
          </div>
        )}
        {!picture && (
          <DropZone
            onUpload={onUpload}
            styles={{
              width: "370px",

              background: "lightblue",
              cursor: "pointer",
            }}
            accept={'accept="image/*'}
          >
            <DropZoneWrapper>
              <img style={{ maxWidth: "inherit" }} src={upload} alt="Upload" />
              <span>Drop file here or click to upload</span>
              <span>Maximum upload size 5MB</span>
            </DropZoneWrapper>
          </DropZone>
        )}

        {picture && (
          <>
            <Button text={"Set as Profile Picture"} onClick={handleSubmit} />

            <Button
              text={"Chose another picture"}
              onClick={() => setPicture(null)}
            />
          </>
        )}
      </Container>
      <ToastContainer />
    </>
  );
};

const DropZoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 40px 40px;
  span {
    color: white;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: #131324;
  height: 100vh;
  width: 100vw;
  .title-container {
    h1 {
      color: white;
      text-align: center;
    }
  }
  .avatar {
    display: flex;
    border: 0.4rem solid transparent;
    border-radius: 50%;
    max-width: 400px;
    height: 400px;
    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }
`;

export default SetAvatar;
