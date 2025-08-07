// Auth action types

export interface ILoginFormData {
  phone: number;
  password: string;
}

export interface IRegisterFormData {
  username: string;
  email: string;
  phoneNo: number;
  password: string;
  confirmPassword: string;
  token?: string;
}
