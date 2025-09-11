// Global toast configuration for consistent styling and positioning
import toast from "react-hot-toast";

// Global toast options
export const TOAST_OPTIONS = {
  position: "top-right" as const,
  duration: 4000,
  style: {
    background: "#363636",
    color: "#fff",
    fontSize: "14px",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  success: {
    duration: 3000,
    iconTheme: {
      primary: "#4ade80",
      secondary: "#fff",
    },
  },
  error: {
    duration: 5000,
    iconTheme: {
      primary: "#ef4444",
      secondary: "#fff",
    },
  },
  loading: {
    duration: Infinity,
    iconTheme: {
      primary: "#3b82f6",
      secondary: "#fff",
    },
  },
};

// Wrapper functions for consistent toast usage
export const showToast = {
  success: (message: string, options?: any) =>
    toast.success(message, { ...TOAST_OPTIONS.success, ...options }),

  error: (message: string, options?: any) =>
    toast.error(message, { ...TOAST_OPTIONS.error, ...options }),

  loading: (message: string, options?: any) =>
    toast.loading(message, { ...TOAST_OPTIONS.loading, ...options }),

  dismiss: (toastId?: string) => toast.dismiss(toastId),
};
