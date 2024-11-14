export default function CompanyDashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Panel de Empresa</h1>
        <p className="mt-2 text-muted-foreground">
          Bienvenido a tu panel de control. Aquí podrás gestionar tus contratistas, realizar pagos y administrar los contratos activos.
        </p>
        <div className="mt-8">
          {/* Aquí irá el contenido del dashboard de la empresa */}
        </div>
      </div>
    </div>
  )
}