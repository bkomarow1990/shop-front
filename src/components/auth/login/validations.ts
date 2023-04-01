import * as yup from 'yup';
export const LoginSchema = yup.object({
    login: yup
    .string()
    .email('Enter an email')
    .required('It`s required field'),
    password: yup.string().required('Enter a password')
});
export default LoginSchema;