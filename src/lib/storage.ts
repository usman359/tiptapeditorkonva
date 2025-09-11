// localStorage utilities for persisting editor content

import toast from "react-hot-toast";

const STORAGE_KEY = "tiptap-editor-content";

export const saveContent = (
  content: string,
  showToast: boolean = false
): void => {
  try {
    localStorage.setItem(STORAGE_KEY, content);
    // Only show toast if explicitly requested (for manual saves)
    if (showToast) {
      toast.success("Content saved", {
        duration: 2000,
        position: "bottom-right",
        style: {
          fontSize: "12px",
          padding: "8px 12px",
        },
      });
    }
  } catch (error) {
    console.error("Failed to save content to localStorage:", error);
    toast.error("Failed to save content");
  }
};

export const loadContent = (): string => {
  try {
    const savedContent = localStorage.getItem(STORAGE_KEY);
    return savedContent || "";
  } catch (error) {
    console.error("Failed to load content from localStorage:", error);
    return "";
  }
};

export const clearContent = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    toast.success("Content cleared", {
      duration: 3000,
      position: "top-center",
    });
  } catch (error) {
    console.error("Failed to clear content from localStorage:", error);
    toast.error("Failed to clear content");
  }
};

export const hasStoredContent = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    console.error("Failed to check stored content:", error);
    return false;
  }
};
