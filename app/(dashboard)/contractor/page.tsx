"use client"

import { useCallback, useEffect, useState } from "react"
import { ContractCard } from "@/components/dashboard/contract-card"
import { ContractsFilter } from "@/components/dashboard/contracts-filter"
import { ContractsSearch } from "@/components/dashboard/contracts-search"
import { ContractorStats } from "@/components/dashboard/contractor-stats"
import { Contract, ContractStatus } from "@/types/contract"
import { getContracts } from "@/app/actions/contracts"
import { useDebounce } from "@/hooks/use-debounce"

export default function ContractorDashboard() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "all">("all")
  
  const debouncedSearch = useDebounce(searchQuery, 300)

  const loadContracts = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getContracts({
        search: debouncedSearch,
        status: statusFilter,
        userId: "1", // Este ID debería venir del usuario autenticado
        role: "contractor"
      })
      setContracts(data)
    } catch (error) {
      console.error("Error loading contracts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearch, statusFilter])

  useEffect(() => {
    loadContracts()
  }, [loadContracts])

  // Simulamos obtener el nombre del usuario autenticado y su balance
  const userName = "Juan Pérez" // Esto debería venir de un contexto de autenticación
  const availableBalance = 15750.50 // Esto debería venir de una API

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hola, {userName}</h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona tus contratos y visualiza el estado de tus proyectos
          </p>
        </div>

        <ContractorStats availableBalance={availableBalance} />

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <ContractsSearch
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <ContractsFilter
              currentStatus={statusFilter}
              onFilterChange={setStatusFilter}
            />
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-[200px] rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <ContractCard key={contract.id} contract={contract} />
                ))}
              </div>

              {contracts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No se encontraron contratos que coincidan con los filtros aplicados.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}