import React, { useState, useRef, useEffect, useId } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { entranceAnimations } from "@/libs/animations/entranceAnimation";

const tooltipVariants = cva(
  "absolute z-50 rounded-md shadow-md pointer-events-none whitespace-normal break-words max-w-xs transition-opacity duration-150 ease-in-out",
  {
    variants: {
      variant: {
        dark: "bg-slate-900 text-white border border-slate-800",
        light: "bg-white text-gray-900 border border-gray-200 shadow-lg",
        primary: "bg-indigo-600 text-white border border-indigo-500 shadow-lg",
        outline:
          "bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 shadow-sm",
      },
      position: {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
        left: "right-full top-1/2 -translate-y-1/2 mr-2",
        right: "left-full top-1/2 -translate-y-1/2 ml-2",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-xs font-medium",
        lg: "px-4 py-2 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
      size: "md",
    },
  }
);

const arrowVariants = cva(
  "absolute w-0 h-0 border-4 border-transparent pointer-events-none",
  {
    variants: {
      variant: {
        dark: "",
        light: "",
        primary: "",
        outline: "",
      },
      position: {
        top: "top-full left-1/2 -translate-x-1/2 border-t-slate-900",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-900",
        left: "left-full top-1/2 -translate-y-1/2 border-l-slate-900",
        right: "right-full top-1/2 -translate-y-1/2 border-r-slate-900",
      },
    },
    defaultVariants: {
      variant: "dark",
      position: "top",
    },
  }
);

// Map variant + position to arrow border colors for precise arrow matching
const getArrowStyle = (
  variant: "dark" | "light" | "primary" | "outline" = "dark",
  position: "top" | "bottom" | "left" | "right" = "top"
) => {
  const bgMap = {
    dark: "#0f172a", // slate-900
    light: "#ffffff",
    primary: "#4f46e5", // indigo-600
    outline: "var(--card-bg, #ffffff)",
  };

  const color = bgMap[variant] || bgMap.dark;

  switch (position) {
    case "top":
      return { borderTopColor: color };
    case "bottom":
      return { borderBottomColor: color };
    case "left":
      return { borderLeftColor: color };
    case "right":
      return { borderRightColor: color };
    default:
      return { borderTopColor: color };
  }
};

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode;
  delay?: number;
  asChild?: boolean;
  animation?: keyof typeof entranceAnimations;
  children: React.ReactElement;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      delay = 0,
      position = "top",
      variant = "dark",
      size = "md",
      asChild = false,
      animation = "fadeIn",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const generatedId = useId();
    const tooltipId = props.id || `tooltip-${generatedId}`;

    const handleMouseEnter = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (delay > 0) {
        timerRef.current = setTimeout(() => setIsVisible(true), delay);
      } else {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsVisible(false);
    };

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    useEffect(() => {
      if (isVisible && tooltipRef.current && animation && animation !== "none") {
        entranceAnimations[animation]?.(tooltipRef.current);
      }
    }, [isVisible, animation]);

    // Handle trigger element children
    const childProps = (children as React.ReactElement<{
      onMouseEnter?: React.MouseEventHandler;
      onMouseLeave?: React.MouseEventHandler;
      onFocus?: React.FocusEventHandler;
      onBlur?: React.FocusEventHandler;
      "aria-describedby"?: string;
    }>).props || {};

    const triggerProps = {
      onMouseEnter: (e: React.MouseEvent) => {
        childProps.onMouseEnter?.(e);
        handleMouseEnter();
      },
      onMouseLeave: (e: React.MouseEvent) => {
        childProps.onMouseLeave?.(e);
        handleMouseLeave();
      },
      onFocus: (e: React.FocusEvent) => {
        childProps.onFocus?.(e);
        handleMouseEnter();
      },
      onBlur: (e: React.FocusEvent) => {
        childProps.onBlur?.(e);
        handleMouseLeave();
      },
      "aria-describedby": isVisible ? tooltipId : childProps["aria-describedby"],
    };

    const TriggerComponent = asChild ? Slot : "div";

    return (
      <div className="relative inline-flex items-center justify-center">
        <TriggerComponent {...triggerProps}>{children}</TriggerComponent>

        {isVisible && (
          <div
            ref={(node) => {
              tooltipRef.current = node;
              if (typeof ref === "function") ref(node as HTMLDivElement);
              else if (ref)
                (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            id={tooltipId}
            role="tooltip"
            className={cn(tooltipVariants({ variant, position, size }), className)}
            {...props}
          >
            {content}
            <span
              className={cn(arrowVariants({ position }))}
              style={getArrowStyle(variant || "dark", position || "top")}
            />
          </div>
        )}
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip, tooltipVariants };
