export const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
export const isZipValid = (zip: string) => /^\d{5}$/.test(zip);
