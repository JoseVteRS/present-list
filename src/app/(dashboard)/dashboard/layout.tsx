import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { Metadata } from "next";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Escritorio",
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full container mx-auto py-5">
      <DashboardNavbar />
      <div>{children}</div>
    </div>
  );
}
