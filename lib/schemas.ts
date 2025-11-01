import * as yup from 'yup';

export const filterCandidatesSchema = yup
  .object()
  .shape({
    country: yup.string().required(),
    province: yup.string(),
    district: yup.string(),
    muncipality: yup.string(),
  })
  .required();
