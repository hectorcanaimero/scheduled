import { NextResponse } from "next/server";

type LoginPayload = { email?: unknown; password?: unknown };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as LoginPayload | null;

  if (
    !body ||
    typeof body.email !== "string" ||
    typeof body.password !== "string"
  ) {
    return NextResponse.json(
      { message: "Ingresá un correo y una contraseña válidos." },
      { status: 400 },
    );
  }

  const apiUrl = process.env.API_URL;
  if (!apiUrl) {
    return NextResponse.json(
      { message: "El servicio de autenticación no está configurado." },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(`${apiUrl.replace(/\/$/, "")}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
      cache: "no-store",
    });
    const payload = (await upstream.json().catch(() => ({}))) as {
      access_token?: string;
      message?: string | string[];
    };

    if (!upstream.ok || !payload.access_token) {
      const message = Array.isArray(payload.message)
        ? payload.message[0]
        : payload.message;
      return NextResponse.json(
        { message: message ?? "Correo o contraseña incorrectos." },
        { status: upstream.status || 401 },
      );
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("recepcion_session", payload.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch {
    return NextResponse.json(
      { message: "No pudimos conectar con el servicio de autenticación." },
      { status: 502 },
    );
  }
}
