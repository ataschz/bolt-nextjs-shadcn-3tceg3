"use client"

import { Card } from "@/components/ui/card"
import { DollarSign } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const monthlyData = [
  { month: "Ene", earnings: 2500, contracts: 2 },
  { month: "Feb", earnings: 3200, contracts: 3 },
  { month: "Mar", earnings: 4100, contracts: 3 },
  { month: "Abr", earnings: 3800, contracts: 4 },
  { month: "May", earnings: 5200, contracts: 5 },
  { month: "Jun", earnings: 4700, contracts: 4 },
]

interface ContractorStatsProps {
  availableBalance: number
}

export function ContractorStats({ availableBalance }: ContractorStatsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Gráfico de progresión */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Progresión Mensual</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <XAxis 
                dataKey="month" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-background border rounded-lg shadow-lg p-3">
                        <p className="font-medium">{payload[0].payload.month}</p>
                        <p className="text-sm text-muted-foreground">
                          Ingresos: {formatCurrency(payload[0].payload.earnings)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Contratos: {payload[0].payload.contracts}
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                strokeWidth={2}
                stroke="hsl(var(--primary))"
                dot={false}
              />
            </LineChart>
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
              Disponible para retiro
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}