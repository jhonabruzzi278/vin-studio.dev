import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-1 focus-visible:ring-zinc-900",
  {
    variants: {
      variant: {
        // Primary: Negro sólido -> Gris oscuro al hover
        default: "bg-zinc-900 text-white border border-zinc-900 hover:bg-zinc-800",
        
        // Secondary: Blanco con borde -> Fondo gris claro al hover
        outline: "bg-white text-zinc-900 border border-zinc-900 hover:bg-zinc-50",
        
        // Ghost: Transparente -> Gris claro al hover
        ghost: "hover:bg-zinc-100 hover:text-zinc-900",
        
        // Link: Subrayado minimalista
        link: "text-zinc-900 underline-offset-4 hover:underline",
        
        // Destructive: Mantener monocromía
        destructive: "bg-zinc-900 text-white border border-zinc-900 hover:bg-zinc-800",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
