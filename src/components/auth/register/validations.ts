import * as yup from 'yup';
export const RegisterSchema = yup.object({
    email: yup
    .string()
    .email('Enter an email')
    .required('It`s required field'),
    password: yup.string().required('Enter a password'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), ''], "Password don`t match").required('Password confirmation is required'),
    phone: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Enter valid phone number'),
    // photo: yup.object().required('Choose an image'),

});
export default RegisterSchema;