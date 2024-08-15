'use client';

import { dm_serif_display, poppins } from '@/layouts/fonts';
import { Button, ButtonProps, Input, InputProps } from 'antd';
import { PasswordProps } from 'antd/es/input/Password';
import { ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type RegisterFunction<T extends FieldValues> = UseFormRegister<T>;

interface InputFormProps<T extends FieldValues> extends InputProps {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface PasswordFormProps<T extends FieldValues> extends Omit<PasswordProps, 'type'> {
  name: Path<T>;
  register: RegisterFunction<T>;
}

interface ButtonFormProps extends ButtonProps {}

interface FormProps {
    children: ReactNode;
    submit: (e:any) => any;
    className?: string
}


export default function Form({children, submit, ...props} : FormProps) {
  return (
    <form className={`${props.className}`} onSubmit={submit}>
        {children}
    </form>
  )
}

Form.Input = <T extends FieldValues>({ register, ...props }: InputFormProps<T>) => {
    const registerP = register(props.name)
    return <label {...registerP}><Input className={`p-2 py-3 my-1 ${poppins.className} ${props.className}`}{...props}/></label>
}

Form.Password = <T extends FieldValues>({ register, ...props }: PasswordFormProps<T>) => {
  const registerP = register(props.name)
    return <label {...registerP}><Input.Password className={`p-2 py-3 my-1 ${poppins.className} ${props.className}`}{...props}/></label>
}

Form.Title = ({ children, className} : { children: string, className?: string}) => {
    return <h4 className={`text-2xl  font-semibold ${dm_serif_display.className} ${className}`}>{ children }</h4>
}
  Form.Button = (spread: ButtonFormProps) => {
    return <Button htmlType="submit"  className={`my-1 ${poppins.className} ${spread.className}`} {...spread}/>
}
