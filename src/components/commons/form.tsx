'use client';

import { Button, ButtonProps, Checkbox, CheckboxProps as _CheckboxProps, Input, InputProps, SelectProps, UploadProps } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import { PasswordProps } from 'antd/es/input/Password';
import { Select as ASelect } from "antd";
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister, UseControllerProps, Controller, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';
import { Upload as _Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const poppins = Poppins({
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ["100", "400", "600"]
});

type RegisterFunction<T extends FieldValues> = UseFormRegister<T>;
type ControlFunction<T extends FieldValues> = Omit<UseControllerProps<T>, 'name'>;

interface InputFormProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface PasswordFormProps<T extends FieldValues> extends Omit<PasswordProps, 'type'> {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface TextAreaFormProps<T extends FieldValues> extends Omit<TextAreaProps , 'type'> {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface SelectFormProps<T extends FieldValues> extends Omit<SelectProps, 'type'> {
  name: Path<T>;
  control: ControlFunction<T>;
}

interface UploadFormProps<T extends FieldValues> extends Omit<UploadProps, 'type'> {
  name: Path<T>;
  control: ControlFunction<T>;
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

const TextArea = <T extends FieldValues>({ register, ...props }: TextAreaFormProps<T>) => {
  const registerP = register(props.name);
  return (
    <label {...registerP}>
      <Input.TextArea className={`p-2 py-3 my-1 ${poppins.className} ${props.className}`} {...props} />
    </label>
  );
};
TextArea.displayName = 'TextArea';
Form.TextArea = TextArea;

const Select = <T extends FieldValues>({ control, ...props }: SelectFormProps<T>) => {
  const {name, ...rest} = props
  return (
    <Controller
      name={name}
      {...control}
      render={({field}) => (
              <ASelect
                {...field}
                {...rest}
              />
            )}
          />
  );
};

Select.displayName = 'Select';
Form.Select = Select;

const Upload = <T extends FieldValues>({control, ...props }: UploadFormProps<T>) => {
  const {name, ...rest} = props
  return (
    <Controller
      name={name}
      {...control}
      render={({field}) => {
        return (
          <_Upload
            {...field}
            {...rest}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </_Upload>
            )}}
          />
  );
};

Upload.displayName = 'Upload';
Form.Upload = Upload;

