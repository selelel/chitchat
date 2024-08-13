'use client';
import { Button, ButtonProps, Input, InputProps } from 'antd';
import { PasswordProps } from 'antd/es/input/Password';
import { DetailedHTMLProps, InputHTMLAttributes, JSX, ReactNode, RefAttributes } from 'react';
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
    submit: (e:any) => any
}


export default function Form({children, submit} : FormProps) {
  return (
    <form onSubmit={submit}>
        {children}
    </form>
  )
}

interface test extends InputProps{
    register: any;
    name: string
  }

interface test2 extends PasswordProps{
    register: any;
  }
Form.Input = <T extends FieldValues>({ register, ...props }: InputFormProps<T>) => {
    const registerP = register(props.name)
    return <label {...registerP}><Input className={`p-2 ${props.className}`}{...props}/></label>
}

Form.Password = <T extends FieldValues>({ register, ...props }: PasswordFormProps<T>) => {
  const registerP = register(props.name)
    return <label {...registerP}><Input.Password className={`p-2 ${props.className}`}{...props}/></label>
}

Form.Title = ({ children, className} : { children: string, className: string}) => {
    return <h1 className={`text-xl font-semibold ${className}`}>{ children }</h1>
}

Form.Button = (spread: ButtonFormProps) => {
    return <Button htmlType="submit" {...spread}/>
}
