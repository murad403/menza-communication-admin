"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/validation/auth.validation"

const ForgotPasswordPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log("Forgot password submission data:", data)
    router.push("/auth/verify-otp")
  }

  return (
    <div>
      {/* Auth Card */}
      <div className="w-full bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-8 md:p-10 flex flex-col">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/auth/sign-in"
            className="inline-flex items-center text-sm font-medium text-subtitle hover:text-title transition-colors gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to login</span>
          </Link>
        </div>

        {/* Header (Left Aligned) */}
        <div className="mb-8 text-left">
          <h1 className="text-[28px] font-bold text-title tracking-tight font-sans">
            Forgot Password?
          </h1>
          <p className="text-sm text-subtitle mt-2 font-normal leading-relaxed">
            Enter your email address and we'll send you a code to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email Address Field */}
          <div className="space-y-2.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              startIcon={<Mail className="w-[18px] h-[18px]" />}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 font-medium pl-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit">
            Send Reset Code
          </Button>

        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage