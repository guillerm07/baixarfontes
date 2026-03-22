import type { Metadata } from "next";
import { AdminApp } from "./AdminApp";

export const metadata: Metadata = {
  title: "Painel de Administração",
  robots: "noindex, nofollow",
};

export default function AdminPage() {
  return <AdminApp />;
}
