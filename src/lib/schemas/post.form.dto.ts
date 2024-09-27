import * as yup from 'yup';

export const post_form_schema = yup.object({
    descriptions: yup.string().default(''),
    audience: yup.string().default('public'),
});

export type post_form_types = yup.InferType<typeof post_form_schema>;

export const update_post_form_schema = yup.object({
    descriptions: yup.string().default(''),
    audience: yup.string().default('public'),
});

export type update_post_form_types = yup.InferType<typeof update_post_form_schema>;