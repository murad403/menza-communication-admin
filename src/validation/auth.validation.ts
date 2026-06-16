import { z } from "zod"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\+?[0-9]{7,15}$/

export const signInSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or Phone is required").refine(
    (val) => emailRegex.test(val) || phoneRegex.test(val),
    { message: "Must be a valid email or phone number" }
  ),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Must be a valid email address"),
})

export const verifyOtpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits").regex(/^\d+$/, "OTP must contain only digits"),
})

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type SignInFormValues = z.infer<typeof signInSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type VerifyOtpFormValues = z.infer<typeof verifyOtpSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
