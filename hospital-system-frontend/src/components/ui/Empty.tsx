interface EmptyProps { message?: string }

export default function Empty({ message = 'No hay datos disponibles' }: EmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[#f1f5f9] flex items-center justify-center mb-4">
        <span className="text-3xl">📭</span>
      </div>
      <p className="text-[#64748b] font-500 text-base">{message}</p>
      <p className="text-[#94a3b8] text-sm mt-1">Los datos aparecerán aquí cuando estén disponibles</p>
    </div>
  )
}