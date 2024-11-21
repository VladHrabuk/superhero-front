import * as yup from 'yup';

const requiredString = (field: string) =>
  yup.string().required(`${field} is required!`);

const minLength = (min: number, message: string) =>
  yup.string().min(min, message);

const maxLength = (max: number, message: string) =>
  yup.string().max(max, message);

const nameValidation = (field: string) =>
  requiredString(field)
    .concat(minLength(2, `${field} must be at least 2 characters long!`))
    .concat(maxLength(40, `${field} must not exceed 40 characters!`));

export const validationSuperheroSchema = yup.object({
  nickname: nameValidation('Nickname'),
  realName: nameValidation('Real name'),
  originDespription: requiredString('Origin description'),
  superpowers: requiredString('Superpowers'),
  catchPhrase: requiredString('Catch Phrase'),
  images: yup
    .array()
    .min(1, 'At least one image is required')
    .required('Images are required'),
});

export interface ISuperheroFields
  extends yup.InferType<typeof validationSuperheroSchema> {}
