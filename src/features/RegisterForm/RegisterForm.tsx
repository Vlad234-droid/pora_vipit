import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import Input from "components/Input";
import { Button } from "components/Button";

import { registerRouter } from "utils/ApiRoutes";
import "react-toastify/dist/ReactToastify.css";
import { registrationSchema } from "./config";
import { Pages } from "config";
import { Axios } from "api";
import { toastProps, devices } from "utils";
//@ts-ignore
import pora from "assets/img/pora.jpeg";

const RegisterForm: FC = () => {
  const navigate = useNavigate();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registrationSchema),
  });

  const values = getValues();

  const handleSave = async (formData) => {
    const { username, email, password } = formData;
    const {
      //@ts-ignore
      data,
    } = await Axios(registerRouter, "post", {
      username,
      email,
      password,
    });
    if (!data.status) {
      //@ts-ignore
      toast.error(data.message, toastProps);
    }
    if (data.status) {
      return navigate(`/${Pages.LOGIN}`, {
        state: { register: true },
      });
    }
  };

  return (
    <>
      <FormContainer>
        <form autoComplete="off">
          <div className="brand">
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
            value={values.email}
            setValue={setValue}
            type="email"
            placeholder={"Email"}
            name={"email"}
            //@ts-ignore
            error={errors?.email?.message}
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

          <Input
            value={values.confirmPassword}
            setValue={setValue}
            type="password"
            placeholder={"Confirm Password"}
            name={"confirmPassword"}
            //@ts-ignore
            error={errors?.confirmPassword?.message}
          />

          <Button
            onClick={() => {
              if (Object.keys(errors).length) {
                Object.entries(errors).forEach((item) => {
                  //@ts-ignore
                  toast.error(item[1].message, toastProps);
                });
              }
              handleSubmit(handleSave)();
            }}
            text={"Create User"}
          />
          <div className={"has-account"}>
            <span>Already have an account ?</span>
            <Link to={`/${Pages.LOGIN}`}>Login</Link>
          </div>
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
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
      color: white;
      text-transform: uppercase;
      font-size: clamp(18px, 24px, 28px);
    }
  }
  form {
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: var(--color-black);
    border-radius: 2rem;
    padding: 2.5rem 4rem;
  }
  button {
    margin: auto;
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
  .has-account {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    span {
      color: white;
      text-transform: uppercase;
    }
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      font-size: 18px;
    }
  }

  @media (max-width: ${devices.tablet}) {
    form {
      width: 100%;
      max-width: 560px;
      padding: 1.5rem 2.5rem;
    }
  }
  @media (max-width: ${devices.mobile}) {
    form {
      padding: 1rem 2rem;
    }
    .brand {
      h1 {
        margin-top: 12px;
      }
    }
  }
`;

export default RegisterForm;
