export interface ILoginParams {
  login: string;
  password: string;
}

export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
}
