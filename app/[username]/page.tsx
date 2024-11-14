"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ContractCard } from "@/components/dashboard/contract-card"
import { getContracts } from "@/app/actions/contracts"
import { Contract } from "@/types/contract"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface UserProfileProps {
  params: {
    username: string
  }
}

export default function UserProfile({ params }: UserProfileProps) {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{
    name: string
    email: string
    avatar?: string
    role: "contractor" | "client"
  } | null>(null)

  useEffect(() => {
    const loadUserData = async () => {
      // Simulamos la carga de datos del usuario
      // En una implementación real, esto vendría de una API
      const username = decodeURIComponent(params.username)
      const userData = {
        name: username,
        email: `${username.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop`,
        role: "contractor" as const,
      }
      setUser(userData)

      try {
        const contractsData = await getContracts({
          userId: "1", // En una implementación real, esto vendría del usuario
          role: userData.role,
        })
        setContracts(contractsData)
      } catch (error) {
        console.error("Error loading contracts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [params.username])

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-[1400px] mx-auto">
        <Card className="p-8 mb-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Contratos</h2>
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
                    No se encontraron contratos para este usuario.
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