import { notFound, redirect } from "next/navigation";

export default async function LegacyAppointmentLink({
  searchParams,
}: {
  searchParams: { token?: string | string[] };
}) {
  const { token } = searchParams;

  if (typeof token !== "string" || token.length === 0) {
    notFound();
  }

  redirect(`/agendamiento/${encodeURIComponent(token)}`);
}
