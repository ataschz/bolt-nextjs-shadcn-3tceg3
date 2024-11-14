import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Building2, User2 } from "lucide-react"

export function CTASection() {
  return (
    <div className="bg-primary/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ¿Listo para comenzar?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Únete a nuestra plataforma y comienza a gestionar tus pagos y contratos de manera eficiente
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/auth/register?role=contractor">
                <User2 className="mr-2 h-5 w-5" />
                Registrarse como Contratista
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
              <Link href="/auth/register?role=client">
                <Building2 className="mr-2 h-5 w-5" />
                Registrarse como Empresa
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}