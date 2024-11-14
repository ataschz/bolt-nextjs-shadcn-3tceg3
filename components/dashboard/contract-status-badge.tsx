"use client"

import { Badge } from "@/components/ui/badge"
import { ContractStatus } from "@/types/contract"
import { cn } from "@/lib/utils"

const statusConfig: Record<ContractStatus, {
  label: string
  className: string
}> = {
  initiated: {
    label: "Iniciado",
    className: "bg-blue-600 hover:bg-blue-700"
  },
  accepted: {
    label: "Aceptado",
    className: "bg-emerald-600 hover:bg-emerald-700"
  },
  rejected: {
    label: "Rechazado",
    className: "bg-rose-600 hover:bg-rose-700"
  },
  disputed: {
    label: "En Disputa",
    className: "bg-amber-600 hover:bg-amber-700"
  },
  completed: {
    label: "Finalizado",
    className: "bg-violet-600 hover:bg-violet-700"
  },
}

export function ContractStatusBadge({ status }: { status: ContractStatus }) {
  const config = statusConfig[status]
  
  return (
    <Badge 
      className={cn(
        "font-medium px-2.5 py-0.5 text-xs text-white border-0",
        config.className
      )}
    >
      {config.label}
    </Badge>
  )
}