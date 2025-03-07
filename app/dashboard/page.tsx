type Repair = {
  id: string
  status: string
  // ... other fields
}

function cleanStatus(status: string) {
  return status
    .replace(/::text$/, '')     // Remove ::text from end
    .replace(/^"/, '')          // Remove starting quote
    .replace(/"$/, '')          // Remove ending quote
}

export default function RepairStatus({ repairs = [] }: { repairs?: Repair[] }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* ... other info ... */}
        {repairs.map((repair: Repair) => (
          <span key={repair.id} className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-500">
            {cleanStatus(repair.status)}
          </span>
        ))}
      </div>
    </div>
  )
} 