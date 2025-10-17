
import "./globals.css";
import { AuthProvider } from "@/src/context/AuthContext";
import { ToastProvider } from "@/src/components/ui/Toast";

export const metadata = { title: "TechNova Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
