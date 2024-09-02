import * as yup from "yup";

const email_password_obj = {
  email: yup.string().email('Invalid email address').required("Email is a required field"),
  password: yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
}

export const user_info_schema = yup.object().shape({
  firstname: yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
    .min(2, 'First name must be at least 2 characters long'),
  lastname: yup.string()
    .required('Last name is required')
    .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
    .min(2, 'Last name must be at least 2 characters long'),
  username: yup.string()
    .required('Username is required')
    .transform(value => value.toLowerCase())
    .matches(/^[a-z0-9_]+$/, 'Username must be lowercase and can only contain letters, numbers, and underscores')
    .min(6, 'Username must be at least 6 characters long')
    .max(60, 'Username must not exceed 60 characters'),
  hide_name: yup.boolean().optional(),
});


export const register_user_schema = yup.object().shape({
  user: user_info_schema,
  ...email_password_obj
});

export const user_credential_schema = yup.object().shape(email_password_obj);
export type user_credential_type = yup.InferType<typeof user_credential_schema>;
export type user_info_type = yup.InferType<typeof user_info_schema>;