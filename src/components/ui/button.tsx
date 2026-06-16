import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "destructive"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-color/50 disabled:pointer-events-none disabled:opacity-50 px-4 cursor-pointer select-none",
          variant === "primary" && "bg-button-color text-white hover:bg-button-color/90",
          variant === "outline" && "border border-zinc-200 text-zinc-700 bg-white hover:bg-zinc-50",
          variant === "destructive" && "bg-red-500 text-white hover:bg-red-500/90",
          !className?.includes("w-") && "w-full",
          !className?.includes("h-") && "h-12",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
