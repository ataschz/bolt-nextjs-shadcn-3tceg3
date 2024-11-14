"use client"

import { useCallback, useEffect, useState } from "react"
import { ContractCard } from "@/components/dashboard/contract-card"
import { ContractsFilter } from "@/components/dashboard/contracts-filter"
import { ContractsSearch } from "@/components/dashboard/contracts-search"
import { Contract, ContractStatus } from "@/types/contract"
import { getContracts } from "@/app/actions/contracts"
import { useDebounce } from "@/hooks/use-debounce"
import { CompanyStats } from "@/components/dashboard/company-stats"

export default function CompanyDashboard() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<ContractStatus | "all">("all")
  
  const debouncedSearch = useDebounce(searchQuery, 300)

  // Simulamos obtener el nombre del usuario autenticado y su balance
  const userName = "Tech Solutions Inc" // Esto debería venir de un contexto de autenticación
  const availableBalance = 45750.75 // Esto debería venir de una API

  const loadContracts = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getContracts({
        search: debouncedSearch,
        status: statusFilter,
        userId: "2", // Este ID debería venir del usuario autenticado
        role: "client"
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

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hola, {userName}</h1>
          <p className="mt-2 text-muted-foreground">
            Gestiona tus contratos y visualiza el estado de tus proyectos con contratistas
          </p>
        </div>

        <CompanyStats availableBalance={availableBalance} />

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