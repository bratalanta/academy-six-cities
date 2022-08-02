export type InputNameType = {
  value: string;
  dirty: boolean;
  errorMessage: string;
}

export type FormState = {
  [index: string]: InputNameType
}
