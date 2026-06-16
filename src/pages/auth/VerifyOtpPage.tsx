"use client"
import React, { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { verifyOtpSchema, type VerifyOtpFormValues } from "@/validation/auth.validation"


const VerifyOtpPage = () => {
  const router = useRouter()
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""))
  const [timeLeft, setTimeLeft] = useState(58)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const { handleSubmit, setValue, formState: { errors } } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  })

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return

    const newOtpValues = [...otpValues]
    // Get only last typed char
    newOtpValues[index] = value.substring(value.length - 1)
    setOtpValues(newOtpValues)

    // Propagate to form state
    const fullOtp = newOtpValues.join("")
    setValue("otp", fullOtp, { shouldValidate: true })

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otpValues[index] && index > 0) {
        // Empty value: move to previous input
        const newOtpValues = [...otpValues]
        newOtpValues[index - 1] = ""
        setOtpValues(newOtpValues)
        setValue("otp", newOtpValues.join(""), { shouldValidate: true })
        inputRefs.current[index - 1]?.focus()
      } else {
        // Clear current input value
        const newOtpValues = [...otpValues]
        newOtpValues[index] = ""
        setOtpValues(newOtpValues)
        setValue("otp", newOtpValues.join(""), { shouldValidate: true })
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text").trim()
    if (/^\d{6}$/.test(text)) {
      const digits = text.split("")
      setOtpValues(digits)
      setValue("otp", text, { shouldValidate: true })
      inputRefs.current[5]?.focus()
    }
  }

  const handleResend = () => {
    if (timeLeft === 0) {
      setTimeLeft(58)
      // trigger mock API resend code here
    }
  }

  const onSubmit = (data: VerifyOtpFormValues) => {
    console.log("Verify OTP submission data:", data)
    router.push("/auth/reset-password")
  }

  return (
    <div>
      {/* Auth Card */}
      <div className="w-full bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-8 md:p-10 flex flex-col">

        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center text-sm font-medium text-subtitle hover:text-title transition-colors gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>

        {/* Header (Left Aligned) */}
        <div className="mb-8 text-left">
          <h1 className="text-[28px] font-bold text-title tracking-tight font-sans">
            Verify OTP
          </h1>
          <p className="text-sm text-subtitle mt-2 font-normal leading-relaxed">
            Enter the 6-digit code sent to your email address.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* 6 Digit OTP Input Boxes */}
          <div>
            <div className="flex justify-between items-center gap-2 md:gap-3">
              {otpValues.map((val, idx) => (
                <input
                  key={idx}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={val}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#F5F5F7] text-title text-center text-lg font-bold border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-color/50 transition-all"
                />
              ))}
            </div>
            {errors.otp && (
              <p className="text-xs text-red-500 mt-2 font-medium text-center">
                {errors.otp.message}
              </p>
            )}
          </div>

          {/* Resend text */}
          <div className="text-center">
            {timeLeft > 0 ? (
              <p className="text-sm text-subtitle font-normal">
                Resend code in <span className="font-medium">{timeLeft}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-semibold text-button-color hover:underline focus:outline-none cursor-pointer"
              >
                Resend code
              </button>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit">
            Verify Code
          </Button>

        </form>
      </div>
    </div>
  )
}

export default VerifyOtpPage