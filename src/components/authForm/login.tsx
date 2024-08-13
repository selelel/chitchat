"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useLogInMutation } from "@/modules/auth/authApi";
import { login_form_schema, login_form_types } from "@/schemas/login.form.dto";
import { LOCALSTORAGE } from "@/constants/localstorage";
import { redirect } from "next/navigation";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirects";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Form from "../commons/form";

export const LogIn = () => {
  useRedirectIfAuthenticated()
  const [errorMessages, setErrorMessages] = useState<string | undefined>();
  const [logIn, { data, isLoading }] = useLogInMutation();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<login_form_types>({
    resolver: yupResolver(login_form_schema),
  });

  useEffect(() => {
    if (data?.loginUser?.accesstoken) {
      localStorage.setItem(LOCALSTORAGE.TOKEN, data.loginUser.accesstoken);
    }
  }, [data]);

  useEffect(() => {
    setErrorMessages(errors.email?.message || errors.password?.message);
  }, [errors]);

  const handleLogIn = async ({ password, email}: login_form_types) => {
    try {
      await logIn({ password, email }).unwrap();
    } catch (error: any) {
      setErrorMessages(error.message || 'An unexpected error occurred.');
    }
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (data) {
    redirect("/");
    return <div className="p-4">{JSON.stringify(data)}</div>;
  }

  return (
    <div className="p-4">
      <Form submit={handleSubmit(handleLogIn)}>
        <Form.Input
        register={register}
        name='email'
        status={errors.email ? 'error' : ''}
        placeholder="Email"
        type="email"/>

        <Form.Password
        register={register}
        name="password"
        placeholder="Password"
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />

        <Form.Button>Submit</Form.Button>
      </Form>

      {/* <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
        <input
          {...register('email')}
          className={`border border-${errors.email ? 'red' : 'blue'}-500 p-2`}
          placeholder="Email"
        />
        <Input.Password
        {...register('password')}
        placeholder="Password"
        className={`border border-${errors.password ? 'red' : 'blue'}-500 p-2`}
        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`border p-2 ${
            isLoading
              ? 'bg-gray-400 text-gray-700 border-gray-400 cursor-not-allowed'
              : 'bg-blue-500 text-white border-blue-500'
          }`}
        >
          Submit
        </button>
      </form> */}
      {errorMessages && <p className="text-red-500 text-xs">{errorMessages}</p>}
    </div>
  );
};

// create a function that when login is successfull it will automatically store all the user details in the localstorage.
