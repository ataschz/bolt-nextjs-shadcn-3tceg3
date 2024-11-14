"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Contract } from "@/types/contract"
import { ContractStatusBadge } from "./contract-status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, CalendarDays, DollarSign, Users } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export function ContractCard({ contract }: { contract: Contract }) {
  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: contract.currency,
    }).format(amount)
  }

  const contractors = contract.parties.filter(party => party.role === "contractor")
  const clients = contract.parties.filter(party => party.role === "client")

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          {/* Header: Status, Title and Amount */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <ContractStatusBadge status={contract.status} />
              <h3 className="font-semibold text-xl leading-none truncate">
                {contract.title}
              </h3>
            </div>
            <div className="flex items-center text-lg font-semibold bg-primary/5 px-3 py-1 rounded-md whitespace-nowrap">
              <DollarSign className="h-5 w-5 text-primary mr-1" />
              {formatAmount(contract.amount)}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
            {contract.description}
          </p>

          {/* Dates */}
          <div className="flex items-center space-x-4 text-sm bg-muted/50 p-3 rounded-md">
            <CalendarDays className="h-4 w-4 text-primary shrink-0" />
            <div className="grid grid-cols-2 gap-x-8 w-full">
              <div>
                <p className="text-muted-foreground">Inicio</p>
                <p className="font-medium">{formatDate(contract.startDate)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Finalización estimada</p>
                <p className="font-medium">{formatDate(contract.estimatedEndDate)}</p>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="grid grid-cols-2 gap-6">
            {/* Contractors */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Contratistas</h4>
              </div>
              <div className="space-y-2">
                {contractors.map((contractor) => (
                  <div key={contractor.id} className="flex items-center space-x-3 bg-background p-2 rounded-lg">
                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                      <AvatarImage src={contractor.avatar} />
                      <AvatarFallback>{contractor.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium leading-none truncate">{contractor.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{contractor.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Contratantes</h4>
              </div>
              <div className="space-y-2">
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center space-x-3 bg-background p-2 rounded-lg">
                    <Avatar className="h-10 w-10 border-2 border-primary/10">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback>{client.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-medium leading-none truncate">{client.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{client.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}