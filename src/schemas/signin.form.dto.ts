import * as yup from "yup";

export const signin_form_schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required("Email is a required field"),
  password: yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

export type sign_form_types = yup.InferType<typeof signin_form_schema>;