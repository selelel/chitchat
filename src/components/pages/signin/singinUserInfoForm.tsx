"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useSignInMutation } from "@/lib/features/auth/authApi";
import Form from "@/components/commons/form";
import { user_info_schema, user_info_type } from "@/lib/schemas/signin.form.dto";
import { UserSignInContext } from "./signinContext";
import { UserInput } from "@/lib/graphql/graphqlTypes";
import { Alert, notification } from "antd";
import { poppins } from "@/utils/fonts";

export const SinginUserInfoForm = () => {
  const context = useContext(UserSignInContext);
  const { register, handleSubmit, formState: { errors } } = useForm<user_info_type>({ resolver: yupResolver(user_info_schema) });
  const [registerUser, { isLoading, data }] = useSignInMutation();
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    const errorMessage = errors.firstname?.message || errors.lastname?.message || errors.username?.message;
    setFormErrorMessage(errorMessage);
  }, [errors]);

  const handleCreatingUser = async (user: user_info_type) => {
    if(!context?.userInfoValues) {
      setFormErrorMessage('An unexpected error occurred.');
      return 
    }

    const {email, password} = context.userInfoValues 

    const result: any = await registerUser({
      user,
      email,
      password
    } as UserInput)

    if(result?.error) setFormErrorMessage(result?.error.message || 'An unexpected error occurred.');

    api.success({
      message: 'Profile Created Successfully!',
      description: 'You will be redirected to the login page shortly. 😊',
      showProgress: true,
      duration: 3,
      onClose: () => window.location.href= '/auth/login',
    });
  };

  return (
    <Form submit={handleSubmit(handleCreatingUser)} className="space-y-2">
      {contextHolder}
      <Form.Title>Creating your profile 😉</Form.Title>
      {formErrorMessage && (
        <Alert className={poppins.className} type="error" message={formErrorMessage} banner />
      )}
      <div className="flex flex-col w-full">
        <h4 className="font-semibold text-xs text-custom-1">
          Firstname
        </h4>
        <Form.Input
          register={register}
          name="firstname"
        />
      </div>

      <div className="flex flex-col w-full">
        <h4 className="font-semibold text-xs text-custom-1">
          Lastname
        </h4>
        <Form.Input
          register={register}
          name="lastname"
        />
      </div>

      <div className="flex flex-col w-full">
        <h4 className="font-semibold text-xs text-custom-1">
          Username
        </h4>
        <Form.Input
          register={register}
          name="username"
        />
      </div>

      <div className="flex w-full items-center">
        <h4 className="font-semibold text-xs text-custom-1">
          Should I Hide Your Real Name on Public?
        </h4>
        <Form.Checkbox 
          register={register}
          name="hide_name"
        />
      </div>

      <Form.Button
        loading={isLoading}
        disabled={!!data}
        className="w-full sm:w-fit text-md py-5 px-10 font-semibold"
      >
        Next
      </Form.Button>
    </Form>
  );
};