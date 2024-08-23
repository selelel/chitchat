"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useLogInMutation } from "@/modules/auth/authApi";
import { login_form_schema, login_form_types } from "@/schemas/login.form.dto";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Form from "@/components/commons/form";
import { poppins } from "@/layouts/fonts";
import { Alert, Button, Divider } from "antd";
import { COLOR } from "@/theme/color";
import { GoogleIcon } from "@/components/commons/icon/SocialMedia";
import { handleSignInUser } from "@/helper/auth_helper/sign_user";
import { useLogInUser } from "@/helper/auth_helper/token";
import { useRedirectIfAuthenticated } from "@/helper/auth_helper/redirect";

export const LoginFormComponent = () => {
  useRedirectIfAuthenticated()
  const { register, handleSubmit, formState: { errors } } = useForm<login_form_types>({ resolver: yupResolver(login_form_schema) });
  const [logIn, { data , isLoading }] = useLogInMutation();
  const [errorMessages, setErrorMessages] = useState<string | undefined>();

  useLogInUser({data})
  
  useEffect(() => {
    setErrorMessages(errors.email?.message || errors.password?.message);
  }, [errors]);
  
  const handleLogIn = async ({ password, email }: login_form_types) => {
    try {
      await logIn({ password, email }).unwrap();
    } catch (error: any) {
      setErrorMessages(error.message || 'An unexpected error occurred.');
    }
  };
  
  return (
      <Form submit={handleSubmit(handleLogIn)} className="space-y-2">
      <Form.Title>Log in to your account</Form.Title>
      <p className={`font-semibold ${poppins.className}`}>
        Don't Have an Account? 
        <a href="/auth/signin" className="text-cyan-500 cursor-pointer"> Sign Up</a>
    </p>

    <Button
      tabIndex={0}
      className="flex flex-row justify-center space-x-1 items-center w-full rounded-md py-5 px-10 cursor-pointer"
      onClick={handleSignInUser}
    >
      <GoogleIcon boxSize={4} />
      <p className={`font-semibold text-custom-grey ${poppins.className}`}>Google</p>
    </Button>

    <Divider
      className={poppins.className}
      style={{
        color: COLOR.GREY,
        border: COLOR.GREY,
        fontSize: '0.75rem',
        fontWeight: 400,
        opacity: 0.7,
      }}
    >
      Or with email and password
    </Divider>

    {errorMessages && (
      <Alert className={poppins.className} type="error" message={errorMessages} banner />
    )}

    <div className="flex flex-col w-full">
      <h4 className={`font-semibold text-xs text-custom-1 ${poppins.className}`}>
        Email Address
      </h4>
      <Form.Input
        register={register}
        name="email"
        status={errors.email ? 'error' : ''}
        type="email"
      />
    </div>

    <div className="flex flex-col w-full">
      <h4 className={`font-semibold text-xs text-custom-1 ${poppins.className}`}>
        Password
      </h4>
      <Form.Password
        register={register}
        name="password"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
    </div>

    <Form.Button
      loading={isLoading}
      className={`w-full sm:w-fit text-md py-5 px-10 font-semibold ${poppins.className}`}
    >
      Next
    </Form.Button>
  </Form>
  );
};