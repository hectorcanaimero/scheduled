import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tu consulta | Agendamiento",
  description: "Revisá los datos de tu próxima consulta.",
  themeColor: "#f3efe6",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
