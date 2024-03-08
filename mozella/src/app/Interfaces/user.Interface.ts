export interface User {
  userName: string,
  email: string,
  password: string
}

export interface loginDetails {
  email: string,
  password: string
}

export interface registerUserResponse {
  success: string,
  error: string
}

export interface loginResponse {
  success: string,
  token: string,
  error: string,
}
