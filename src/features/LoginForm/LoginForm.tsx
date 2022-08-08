import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import Input from "components/Input";
import { Button } from "components/Button";

import { useAuthContainer } from "context/authContext";
import { loginRouter } from "utils/ApiRoutes";
import { removeLocalItem, setLocalItem, toastProps } from "utils";
import { Pages } from "config";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "./config";

import { Axios } from "api";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const { setUser } = useAuthContainer();

  const values = getValues();

  const handleSave = async (formData) => {
    const { username, password } = formData;
    // @ts-ignore
    const { data } = await Axios(loginRouter, "post", {
      username,
      password,
    });

    if (!data.status) {
      // @ts-ignore
      toast.error(data.message, toastProps);
    }
    if (data.status) {
      try {
        // @ts-ignore
        setUser(data.user);
        setLocalItem("token", data.token);
        navigate(Pages.BASE);
      } catch (e) {
        removeLocalItem("token");
        navigate(Pages.BASE);
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form autoComplete="off">
          <div className="brand">
            <img src="" alt="" />
            <h1>Pora Vipit Chat</h1>
          </div>
          <Input
            value={values["username"]}
            setValue={setValue}
            type="text"
            placeholder={"Username"}
            name={"username"}
            //@ts-ignore
            error={errors?.username?.message}
          />

          <Input
            value={values.password}
            setValue={setValue}
            type="password"
            placeholder={"Password"}
            name={"password"}
            //@ts-ignore
            error={errors?.password?.message}
          />
          <Button
            text={"Log In"}
            onClick={() => {
              if (Object.keys(errors).length) {
                Object.entries(errors).forEach((item) => {
                  //@ts-ignore
                  toast.error(item[1].message, toastProps);
                });
              }
              handleSubmit(handleSave)();
            }}
          />

          <span>
            Don`t have an account ?{" "}
            <Link to={`/${Pages.REGISTER}`}>Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  button {
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
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default LoginForm;
