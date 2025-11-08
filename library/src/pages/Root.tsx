import { Outlet } from "react-router-dom";
import { FrappeProvider } from "frappe-react-sdk";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Root = () => {
  const getSiteName = () => {
    const frappeWindow = window as any;
    if (
      frappeWindow.frappe?.boot?.versions.frappe &&
      (frappeWindow.frappe.boot.versions.frappe.startsWith("15") ||
        frappeWindow.frappe.boot.versions.frappe.startsWith("16"))
    ) {
      return (
        frappeWindow.frappe?.boot?.sitename ?? import.meta.env.VITE_SITE_NAME
      );
    }
    return import.meta.env.VITE_SITE_NAME;
  };
  return (
    <FrappeProvider
      socketPort={import.meta.env.VITE_SOCKET_PORT}
      siteName={getSiteName()}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FrappeProvider>
  );
};
