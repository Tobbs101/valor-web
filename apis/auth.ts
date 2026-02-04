/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "./client";

export const auth = {
  signUp: ({ payload }: { payload: any }) =>
    client
      .post(`validateEmailSignUpOtp`, payload)
      .then(({ data }: any) => data),

  getOtp: ({ payload }: { payload: any }) =>
    client.post(`sendEmailSignUpOtp`, payload).then(({ data }: any) => data),
};
