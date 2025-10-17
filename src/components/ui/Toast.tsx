"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type ToastMsg = { id: number; text: string };
type Ctx = { push: (text: string) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastMsg[]>([]);
  const push = useCallback((text: string) => {
    const id = Date.now();
    setItems((arr) => [...arr, { id, text }]);
    setTimeout(() => setItems((arr) => arr.filter((t) => t.id !== id)), 2500);
  }, []);
  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {items.map((t) => (
          <div key={t.id} className="rounded-2xl shadow-lg px-4 py-2 bg-black/80 text-white text-sm">
            {t.text}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
