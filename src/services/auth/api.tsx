import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

/**
 * TMS Onward - Authentication API
 */
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    /**
     * POST /auth/login
     * User login with email and password
     */
    login: builder.mutation({
      query: (credentials: { identifier: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * POST /auth/register
     * Register new company & admin user
     * Body: { company_name, company_type, name, email, password, confirm_password, phone?, currency, language }
     */
    register: builder.mutation({
      query: (data: {
        name: string;
        email: string;
        username: string;
        password: string;
        confirm_password: string;
        phone?: string;
        company_name: string;
        address: string;
      }) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    /**
     * POST /auth/logout
     * Logout user and invalidate session
     */
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

  }),
});

// Export RTK Query hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApi;
