"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { signInSchema, type SignInFormValues } from "@/validation/auth.validation"



const SignInPage = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = (data: SignInFormValues) => {
    console.log("Sign-in submission data:", data)
    router.push("/auth/forgot-password")
  }

  return (
    <div>
      {/* Auth Card */}
      <div className="w-full bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-8 md:p-10 flex flex-col">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[32px] font-bold text-title tracking-tight font-sans">
            Zack Admin
          </h1>
          <p className="text-sm text-subtitle mt-1.5 font-normal">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Email or Phone Field */}
          <div className="space-y-2.5">
            <Label htmlFor="emailOrPhone">Email or Phone</Label>
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="admin@example.com"
              startIcon={<Mail className="w-[18px] h-[18px]" />}
              {...register("emailOrPhone")}
            />
            {errors.emailOrPhone && (
              <p className="text-xs text-red-500 mt-1 font-medium pl-1">
                {errors.emailOrPhone.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              startIcon={<Lock className="w-[18px] h-[18px]" />}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 font-medium pl-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2.5 text-title cursor-pointer font-medium select-none">
              <input
                type="checkbox"
                className="w-4.5 h-4.5 rounded-[4px] border-zinc-300 text-button-color focus:ring-button-color focus:ring-offset-0 accent-button-color cursor-pointer"
                {...register("rememberMe")}
              />
              <span>Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="font-medium text-button-color hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button type="submit">
            Sign In
          </Button>

        </form>
      </div>

      {/* Footer Copyright */}
      <p className="text-xs text-center text-white/80 mt-6 font-normal tracking-wide">
        © {new Date().getFullYear()} Zack Admin. All rights reserved.
      </p>
    </div>
  )
}

export default SignInPage