import * as React from "react";
import { cn } from "@/lib/utils";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
}

interface DialogFooterProps {
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-[10000]">{children}</div>
    </div>
  );
};

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-md mx-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ children }: DialogHeaderProps) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }: DialogTitleProps) => (
  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
    {children}
  </h2>
);

const DialogDescription = ({ children }: DialogDescriptionProps) => (
  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{children}</p>
);

const DialogFooter = ({ children }: DialogFooterProps) => (
  <div className="flex justify-end gap-2 mt-6">{children}</div>
);

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
