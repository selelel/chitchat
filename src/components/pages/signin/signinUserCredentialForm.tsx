"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState } from "react";
import { useCheckUserExistsByEmailMutation } from "@/lib/features/auth/authApi";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Form from "@/components/commons/form";
import { Alert, Button, Divider } from "antd";
import { COLOR } from "@/theme/color";
import { UserSignInContext } from "./signinContext";
import { user_credential_schema, user_credential_type } from "@/lib/schemas/signin.form.dto";
import { poppins } from "@/utils/fonts";
import { handleSignInUser } from "@/utils/auth/sign_user";
import { GoogleIcon } from "@/components/commons/icon";

export const SigninUserCredentialForm = () => {
  const context = useContext(UserSignInContext);
  const { register, handleSubmit, formState: { errors } } = useForm<user_credential_type>({ resolver: yupResolver(user_credential_schema) });
  const [checkIfEmailExists, { isLoading }] = useCheckUserExistsByEmailMutation();
  const [formErrorMessage, setFormErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    setFormErrorMessage(errors.email?.message || errors.password?.message);
  }, [errors]);

  const validateUserEmailAndPassword = async (data: user_credential_type) => {
    try {
      const result = await checkIfEmailExists(data.email).unwrap();
      if (result?.checkUserExistsByEmail) {
        setFormErrorMessage("User already has an account.");
      } else {
        context?.setUserValues(data)
      }
    } catch (error: any) {
      setFormErrorMessage(error.message || 'An unexpected error occurred.');
    }
  };

  return (
    <Form submit={handleSubmit(validateUserEmailAndPassword)} className="space-y-2">
      <Form.Title>Create your account</Form.Title>
      <p className={`font-semibold ${poppins.className}`}>
        Already Have an Account? 
        <a href="/login" className="text-cyan-500 cursor-pointer"> Log In Now</a>
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

      {formErrorMessage && (
        <Alert className={poppins.className} type="error" message={formErrorMessage} banner />
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
