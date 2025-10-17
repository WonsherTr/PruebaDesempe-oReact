"use client";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Credenciales inválidas");
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 420, margin: "60px auto" }}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={onSubmit}>
          <label className="label">Correo</label>
          <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <label className="label" style={{marginTop:10}}>Contraseña</label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          {error && <p style={{color:"#ef4444", marginTop:10}}>{error}</p>}
          <button className="btn primary" type="submit" style={{marginTop:12}}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
