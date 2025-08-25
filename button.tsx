import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Cute Pawfect Match variants - NO JUMPING!
        paw: "bg-gradient-primary text-white font-semibold shadow-soft hover:shadow-glow transition-all duration-300",
        heart: "bg-gradient-secondary text-white font-semibold shadow-soft hover:shadow-glow transition-all duration-300",
        treat: "bg-paw-yellow text-foreground font-semibold shadow-soft hover:shadow-glow hover:bg-paw-orange transition-all duration-300",
        swipe: "bg-background border-2 border-primary text-primary font-bold shadow-card hover:bg-primary hover:text-white transition-all duration-300",
        engage: "bg-gradient-hero text-white font-bold shadow-glow transition-all duration-300 hover:brightness-110",
        cute: "bg-paw-pink text-white font-semibold rounded-full shadow-soft hover:bg-paw-purple hover:shadow-glow transition-all duration-300",
        wedding: "bg-gradient-to-r from-paw-pink to-paw-purple text-white font-bold shadow-glow hover:brightness-110 transition-all duration-300"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-lg": "h-16 w-16 text-2xl",
        "icon-xl": "h-20 w-20 text-3xl",
        compact: "h-8 px-3 py-1 text-xs",
        wide: "h-12 px-12 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
