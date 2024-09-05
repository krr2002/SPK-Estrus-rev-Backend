export type RegisterDTO = {
  nik: string
  fullName: string
  email: string
  phone: string
  district: string
  subdistrict: string
  address: string
  password: string
  confirmPassword: string
}

export type LoginDTO = {
  credential: string
  password: string
}