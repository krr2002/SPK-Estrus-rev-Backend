export type RegisterDTO = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export type LoginDTO = {
  username: string
  password: string
}