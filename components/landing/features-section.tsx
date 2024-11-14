import { Shield, DollarSign, Scale, Clock } from "lucide-react"

const features = [
  {
    name: 'Pagos Seguros',
    description: 'Sistema de pagos protegido con garantías para ambas partes.',
    icon: DollarSign,
  },
  {
    name: 'Resolución de Disputas',
    description: 'Proceso transparente y justo para resolver conflictos.',
    icon: Scale,
  },
  {
    name: 'Gestión de Contratos',
    description: 'Herramientas para crear y administrar contratos digitales.',
    icon: Shield,
  },
  {
    name: 'Seguimiento en Tiempo Real',
    description: 'Monitoreo de pagos y estados de proyectos en tiempo real.',
    icon: Clock,
  },
]

export function FeaturesSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Características principales
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Todo lo que necesitas para gestionar pagos y contratos
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Una plataforma integral que simplifica la gestión de pagos y contratos entre empresas y contratistas.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
                <dt className="text-xl font-semibold leading-7">
                  {feature.name}
                </dt>
                <dd className="mt-1 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}