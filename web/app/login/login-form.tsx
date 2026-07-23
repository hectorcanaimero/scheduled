"use client";

import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string };

export function LoginForm() {
  const router = useRouter();
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message: payload.message ?? "No pudimos iniciar sesión. Revisá tus datos.",
        });
        return;
      }

      router.replace("/recepcion");
      router.refresh();
    } catch {
      setState({
        status: "error",
        message: "No pudimos conectar con el servidor. Intentá nuevamente.",
      });
    }
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        <span>Correo electrónico</span>
        <span className="field">
          <Mail size={18} aria-hidden="true" />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="recepcion@clinica.com"
            required
            disabled={isSubmitting}
          />
        </span>
      </label>

      <label>
        <span>Contraseña</span>
        <span className="field">
          <LockKeyhole size={18} aria-hidden="true" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="current-password"
            placeholder="Ingresá tu contraseña"
            minLength={6}
            required
            disabled={isSubmitting}
          />
          <button
            className="password-toggle"
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </span>
      </label>

      <div className="form-meta">
        <label className="remember">
          <input type="checkbox" name="remember" />
          <span>Recordarme</span>
        </label>
        <a href="mailto:soporte@clara.app">¿Necesitás ayuda?</a>
      </div>

      <div className="message-space" aria-live="polite">
        {state.status === "error" && (
          <p className="error-message" role="alert">
            {state.message}
          </p>
        )}
      </div>

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <LoaderCircle className="spinner" size={19} aria-hidden="true" />
            Ingresando…
          </>
        ) : (
          "Ingresar al panel"
        )}
      </button>
    </form>
  );
}
