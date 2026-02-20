/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "./client";

export const auth = {
  signUp: ({ payload }: { payload: any }) =>
    client
      .post(`validateEmailSignUpOtp`, payload)
      .then(({ data }: any) => data),

  getOtp: ({ payload }: { payload: any }) =>
    client.post(`sendEmailSignUpOtp`, payload).then(({ data }: any) => data),

  checkPhoneExists: ({ payload }: { payload: any }) =>
    client.post(`checkPhoneExists`, payload).then(({ data }: any) => data),

  checkEmailExists: ({ payload }: { payload: any }) =>
    client.post(`checkEmailExists`, payload).then(({ data }: any) => data),

  googleSignIn: ({ payload }: { payload: any }) =>
    client.post(`googleSignIn`, payload).then(({ data }: any) => data),

  getPhoneOtp: ({ payload }: { payload: any }) =>
    client.post(`sendPhoneOtp`, payload).then(({ data }: any) => data),

  validatePhoneOtp: ({ payload }: { payload: any }) =>
    client.post(`validatePhoneOtp`, payload).then(({ data }: any) => data),

  signIn: ({ payload }: { payload: any }) =>
    client.post(`login`, payload).then(({ data }: any) => data),
};
