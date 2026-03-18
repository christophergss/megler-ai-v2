"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#161920",
            color: "#F0F0F0",
            border: "1px solid #2A2E38",
          },
          success: {
            iconTheme: {
              primary: "#C4935A",
              secondary: "#F0F0F0",
            },
          },
        }}
      />
      {children}
    </>
  );
}
