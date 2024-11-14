"use client"

import { Card } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ContractStatus } from "@/types/contract"

const contractsData = [
  { status: "initiated", count: 3, label: "Iniciados" },
  { status: "accepted", count: 5, label: "Aceptados" },
  { status: "completed", count: 8, label: "Finalizados" },
  { status: "disputed", count: 2, label: "En Disputa" },
  { status: "rejected", count: 1, label: "Rechazados" },
]

const COLORS = {
  initiated: "hsl(221, 83%, 53%)", // blue-600
  accepted: "hsl(142, 71%, 45%)", // emerald-600
  completed: "hsl(250, 89%, 65%)", // violet-600
  disputed: "hsl(45, 93%, 47%)",  // amber-600
  rejected: "hsl(349, 89%, 60%)", // rose-600
}

interface CompanyStatsProps {
  availableBalance: number
}

export function CompanyStats({ availableBalance }: CompanyStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Gráfico de distribución de contratos */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Distribución de Contratos</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contractsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="count"
              >
                {contractsData.map((entry) => (
                  <Cell 
                    key={entry.status} 
                    fill={COLORS[entry.status as ContractStatus]}
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-3">
                        <p className="font-medium">{data.label}</p>
                        <p className="text-sm text-muted-foreground">
                          Cantidad: {data.count} contratos
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry: any) => {
                  const item = contractsData.find(d => d.status === entry.payload.status);
                  return item?.label;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Balance disponible */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Balance Disponible</h3>
        <div className="flex items-center justify-center h-[200px]">
          <div className="text-center">
            <DollarSign className="h-12 w-12 text-primary mx-auto mb-2" />
            <p className="text-4xl font-bold">{formatCurrency(availableBalance)}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Disponible para pagos
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}