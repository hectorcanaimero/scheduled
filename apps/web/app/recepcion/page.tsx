import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RecepcionPage() {
  const session = (await cookies()).get("recepcion_session");
  if (!session) redirect("/login");

  return (
    <main className="placeholder-page">
      <p className="eyebrow">Sesión iniciada</p>
      <h1>Bienvenida a recepción</h1>
      <p>Tu agenda estará disponible acá.</p>
    </main>
  );
}
