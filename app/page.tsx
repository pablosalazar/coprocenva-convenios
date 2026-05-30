import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">
        Convenios Coprocenva
      </h1>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Ver convenios</Button>
        <Button variant="outline">Explorar categorías</Button>
        <Button variant="secondary">Iniciar sesión</Button>
      </div>
    </main>
  );
}
