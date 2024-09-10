import * as yup from 'yup';

export const login_form_schema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export type login_form_types = yup.InferType<typeof login_form_schema>;
