import type { Metadata } from "next";
import "./reception.css";

export const metadata: Metadata = {
  title: "Panel de recepción",
  description: "Panel de gestión para el equipo de recepción.",
};

export default function RecepcionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="recepcion-layout">{children}</div>;
}
