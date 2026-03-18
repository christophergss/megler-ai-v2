"use client";

import { create } from "zustand";
import type { Property, GeneratedText, UserProfile } from "@/lib/types";

interface AppState {
  user: UserProfile | null;
  properties: Property[];
  generatedTexts: GeneratedText[];
  sidebarOpen: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  setProperties: (properties: Property[]) => void;
  setGeneratedTexts: (texts: GeneratedText[]) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setIsLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  properties: [],
  generatedTexts: [],
  sidebarOpen: true,
  isLoading: false,
  setUser: (user) => set({ user }),
  setProperties: (properties) => set({ properties }),
  setGeneratedTexts: (generatedTexts) => set({ generatedTexts }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  setIsLoading: (isLoading) => set({ isLoading }),
}));
