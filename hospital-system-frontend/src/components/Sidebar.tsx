type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }: Props) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>

      {/* Botón cerrar */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="close-sidebar"
      >
        ×
      </button>

      {/* ===== TU CONTENIDO ACTUAL ===== */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">MediSystem</h1>
        <p className="text-sm text-gray-500">Hospital Management</p>

        <hr className="my-4" />

        <nav className="flex flex-col gap-4">
          <a href="/">Dashboard</a>
          <a href="/patients">Pacientes</a>
          <a href="/doctors">Doctores</a>
          <a href="/appointments">Citas</a>
          <a href="/departments">Departamentos</a>
          <a href="/medications">Medicamentos</a>
        </nav>
      </div>
      {/* =============================== */}

    </aside>
  );
}