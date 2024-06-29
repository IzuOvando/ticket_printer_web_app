import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PrintersAside } from "@/components";
export default async function Home() {
  return (
    <main className="container mt-10">
      <h1 className="text-4xl font-semibold">Ticket Database</h1>
      <div className="flex w-full gap-4 justify-end">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-secondary hover:bg-secondary-light active:bg-secondary-dark">
              Ver Impresoras
            </Button>
          </SheetTrigger>
          <PrintersAside />
        </Sheet>
      </div>
    </main>
  );
}
