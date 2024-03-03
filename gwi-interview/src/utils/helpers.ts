export const urlParamAsString = (input?: string | string[]) => {
  if (Array.isArray(input)) return input[0];
  return input;
};
