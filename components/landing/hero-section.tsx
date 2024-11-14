import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Shield, Users2 } from 'lucide-react';

export function HeroSection() {
  return (
    <div className="relative isolate pt-14 dark:bg-gray-900">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Plataforma de Payroll con Resolución de Disputas
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Gestiona pagos, contratos y resuelve disputas de manera eficiente.
            Una solución integral para contratistas y empresas.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/auth/register">
                Comenzar ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/login">Iniciar sesión</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
