import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-color/50 disabled:pointer-events-none disabled:opacity-50 bg-button-color text-white hover:bg-button-color/90 px-4 h-12 w-full cursor-pointer",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
