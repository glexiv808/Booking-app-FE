import http from "@/utils/api";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: IBackendRes<LoginResType>;
  }> | null,

  sLogin: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/login", body),

  login: (body: LoginBodyType) =>
    http.post<IBackendRes<LoginResType>>("/login", body, {
      baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
    }),

  sVerifyRegister: (code: string) =>
    http.get<IBackendRes<LoginResType>>(`/verifyEmail?token=${code}`),

  verifyRegister: (code: string) =>
    http.post<IBackendRes<LoginResType>>("/api/auth/verify/register", code, {
      baseUrl: "",
    }),

  sLogout: () => http.post<IBackendRes<any>>("/logout", {}),

  logout: () =>
    http.post<IBackendRes<any>>(
      "/logout",
      {},
      {
        baseUrl: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
      }
    ),

  sRegister: (body: RegisterBodyType) =>
    http.post<IBackendRes<any>>("/register", body),
};

export default authApiRequest;
