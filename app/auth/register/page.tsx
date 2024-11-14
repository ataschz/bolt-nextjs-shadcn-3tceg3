"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role')

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Crear cuenta</CardTitle>
        <CardDescription>
          Ingresa tus datos para registrarte en la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" type="password" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="role">Tipo de cuenta</Label>
          <Select defaultValue={defaultRole || undefined}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contractor">Contratista</SelectItem>
              <SelectItem value="client">Empresa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full">
          Registrarse
        </Button>
        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Inicia sesión
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}