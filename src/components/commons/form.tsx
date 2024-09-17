'use client';

import { Button, ButtonProps, Checkbox, CheckboxProps as _CheckboxProps, Input, InputProps } from 'antd';
import { PasswordProps } from 'antd/es/input/Password';
import { DM_Serif_Display, Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

const dm_serif_display = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400"
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ["100", "400", "600"]
});

type RegisterFunction<T extends FieldValues> = UseFormRegister<T>;

interface InputFormProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface PasswordFormProps<T extends FieldValues> extends Omit<PasswordProps, 'type'> {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface CheckboxProps<T extends FieldValues> extends Omit<_CheckboxProps, 'type'> {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface ButtonFormProps extends ButtonProps {}

interface FormProps {
  children: ReactNode;
  submit: (e: any) => any;
  className?: string;
}

export default function Form({ children, submit, ...props }: FormProps) {
  return (
    <form className={`${poppins.className} ${props.className}`} onSubmit={submit}>
      {children}
    </form>
  );
}

const FormInput = <T extends FieldValues>({ register, ...props }: InputFormProps<T>) => {
  const registerP = register(props.name);
  return (
    <label {...registerP}>
      <Input className={`p-2 py-3 my-1 ${poppins.className} ${props.className}`} {...props} />
    </label>
  );
};
FormInput.displayName = 'FormInput';
Form.Input = FormInput;

const FormPassword = <T extends FieldValues>({ register, ...props }: PasswordFormProps<T>) => {
  const registerP = register(props.name);
  return (
    <label {...registerP}>
      <Input.Password className={`p-2 py-3 my-1 ${poppins.className} ${props.className}`} {...props} />
    </label>
  );
};
FormPassword.displayName = 'FormPassword';
Form.Password = FormPassword;

const FormCheckbox = <T extends FieldValues>({ register, ...props }: CheckboxProps<T>) => {
  const registerP = register(props.name);
  return (
    <label {...registerP}>
      <Checkbox className={`p-2 py-3 my-1 ${poppins.className} ${props.className}`} {...props} />
    </label>
  );
};
FormCheckbox.displayName = 'FormCheckbox';
Form.Checkbox = FormCheckbox;

const FormTitle = ({ children, className }: { children: string; className?: string }) => {
  return <h4 className={`text-xl font-normal ${className}`}>{children}</h4>;
};
FormTitle.displayName = 'FormTitle';
Form.Title = FormTitle;

const FormButton = (spread: ButtonFormProps) => {
  return <Button htmlType="submit" className={`my-1 ${poppins.className} ${spread.className}`} {...spread} />;
};
FormButton.displayName = 'FormButton';
Form.Button = FormButton;
