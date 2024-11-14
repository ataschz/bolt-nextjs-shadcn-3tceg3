"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContractStatus } from "@/types/contract"
import { Filter } from "lucide-react"

interface ContractsFilterProps {
  currentStatus: ContractStatus | "all"
  onFilterChange: (status: ContractStatus | "all") => void
}

const statusOptions: { value: ContractStatus | "all"; label: string }[] = [
  { value: "all", label: "Todos los estados" },
  { value: "initiated", label: "Iniciados" },
  { value: "accepted", label: "Aceptados" },
  { value: "rejected", label: "Rechazados" },
  { value: "disputed", label: "En Disputa" },
  { value: "completed", label: "Finalizados" },
]

export function ContractsFilter({
  currentStatus,
  onFilterChange,
}: ContractsFilterProps) {
  return (
    <div className="w-[200px]">
      <Select
        value={currentStatus}
        onValueChange={(value) => onFilterChange(value as ContractStatus | "all")}
      >
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Filtrar por estado" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}