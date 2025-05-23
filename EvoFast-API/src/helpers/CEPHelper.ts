export const isValidCEP = (CEP: string): boolean => {
  const CepRegex =  /^\d{5}-?\d{3}$/;
  return CepRegex.test(CEP);
};