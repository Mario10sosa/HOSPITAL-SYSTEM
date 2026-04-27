import { useState } from "react";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">

      {/* Botón hamburguesa */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="hamburger-btn"
      >
        ☰
      </button>

      {/* Overlay oscuro */}
      {sidebarOpen && (
        <div
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Contenido */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}