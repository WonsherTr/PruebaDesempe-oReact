// src/context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type User = { name: string; email: string };
type AuthCtx = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useSearchParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("tn_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  async function login(email: string, password: string) {
    // Valida credenciales “mock”
    if (!email || !password) throw new Error("Credenciales inválidas");

    const u = { name: email.split("@")[0] || "Usuario", email };
    localStorage.setItem("tn_user", JSON.stringify(u));
    setUser(u);

    // 👉 cookie para el middleware (expira en 1 día)
    document.cookie = `tn_auth=1; path=/; max-age=${60 * 60 * 24}`;

    // redirección (si venía con ?next=/algo)
    const next = params.get("next") || "/dashboard";
    router.replace(next);
  }

  function logout() {
    localStorage.removeItem("tn_user");
    setUser(null);
    // 👉 borra cookie
    document.cookie = "tn_auth=; path=/; max-age=0";
    router.replace("/login");
  }

  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
