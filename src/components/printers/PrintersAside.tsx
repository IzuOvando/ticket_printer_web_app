import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PrinterAsideCard from "./PrinterAsideCard";
import DialogPrinter from "./DialogPrinter";

const PrintersAside = () => {
  const printers: {
    name: string;
    ip: string;
    online: boolean;
  }[] = [
    {
      name: "Impresora 1",
      ip: "192.168.1.1",
      online: true,
    },
    {
      name: "Impresora 2",
      ip: "192.168.1.2",
      online: false,
    },
    {
      name: "Impresora 3",
      ip: "192.168.1.3",
      online: true,
    },
    {
      name: "Impresora 4",
      ip: "192.168.1.4",
      online: true,
    },
    {
      name: "Impresora 5",
      ip: "192.168.1.5",
      online: true,
    },
  ];

  return (
    <SheetContent className="w-full sm:!max-w-[400px] lg:!max-w-[500px]">
      <SheetHeader>
        <SheetTitle>Impresoras Disponibles</SheetTitle>
        <hr className="bg-secondary h-1" />
        <SheetDescription>
          Aquí puedes observar las impresoras termales que se encuentran
          conectadas a tu misma red.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col gap-4 py-4">
        {printers.length === 0 ? (
          <div className="w-full text-center col-span-2 py-4">
            No hay impresoras conectadas
          </div>
        ) : (
          <ScrollArea className="w-full h-[70vh]">
            <div className="w-full grid grid-cols-2 gap-4">
              {printers.map((printer) => (
                <PrinterAsideCard key={printer.ip} {...printer} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-2">Agregar Impresora</Button>
        </DialogTrigger>
        <DialogPrinter mode="add" newPrinterNumber={printers.length + 1} />
      </Dialog>
    </SheetContent>
  );
};

export default PrintersAside;
