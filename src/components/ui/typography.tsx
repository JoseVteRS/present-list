import { cn } from "@/utils";
import { forwardRef } from "react";




export const TypographyH1 = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h1">
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "mt-6 text-5xl font-bold tracking-tight lg:text-6xl",
        className,
      )}
      {...props}
    />
  );
});

TypographyH1.displayName = "TypographyH1";


export const TypographyP = forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-pretty leading-7 [&:not(:first-child)]:mt-4",
        className,
      )}
      {...props}
    />
  );
});

TypographyP.displayName = "TypographyP";