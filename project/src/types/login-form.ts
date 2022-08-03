export type InputName = {
  value: string;
  dirty: boolean;
  errorMessage: string;
}

export type FormState = {
  [index: string]: InputName
}
