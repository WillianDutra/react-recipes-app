import { NUMBER_SIX } from './constants';

const validationInputs = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const validationEmail = emailRegex.test(email);
  const validationGeneral = validationEmail && password.length > NUMBER_SIX;
  return validationGeneral;
};

export default validationInputs;
