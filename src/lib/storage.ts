// localStorage utilities for persisting editor content

import { showToast } from "./toast-config";

const STORAGE_KEY = "tiptap-editor-content";

export const saveContent = (
  content: string,
  showToastNotification: boolean = false
): void => {
  try {
    localStorage.setItem(STORAGE_KEY, content);
    // Only show toast if explicitly requested (for manual saves)
    if (showToastNotification) {
      showToast.success("Content saved");
    }
  } catch (error) {
    console.error("Failed to save content to localStorage:", error);
    showToast.error("Failed to save content");
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
    showToast.success("Content cleared");
  } catch (error) {
    console.error("Failed to clear content from localStorage:", error);
    showToast.error("Failed to clear content");
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
