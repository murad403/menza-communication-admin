"use client"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { resetPasswordSchema, type ResetPasswordFormValues } from "@/validation/auth.validation"

const ResetPasswordPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }} = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data: ResetPasswordFormValues) => {
    console.log("Reset password submission data:", data)
    router.push("/auth/sign-in")
  }

  return (
    <div>
      {/* Auth Card */}
      <div className="w-full bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-8 md:p-10 flex flex-col">

        {/* Header (Left Aligned) */}
        <div className="mb-8 text-left">
          <h1 className="text-[28px] font-bold text-title tracking-tight font-sans">
            Reset Password
          </h1>
          <p className="text-sm text-subtitle mt-2 font-normal leading-relaxed">
            Create a new password for your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* New Password Field */}
          <div className="space-y-2.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="••••••••"
              startIcon={<Lock className="w-[18px] h-[18px]" />}
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1 font-medium pl-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              startIcon={<Lock className="w-[18px] h-[18px]" />}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 font-medium pl-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit">
            Reset Password
          </Button>

        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage