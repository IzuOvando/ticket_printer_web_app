"use client";
import { useState } from "react";
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
import { usePrinterStore } from "@/store";

const PrintersAside = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { printers } = usePrinterStore();

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
      <Button className="w-full mt-2" onClick={() => setShowDialog(true)}>
        Agregar Impresora
      </Button>
      <DialogPrinter
        open={showDialog}
        setOpen={setShowDialog}
        mode="add"
        newPrinterNumber={printers.length + 1}
      />
    </SheetContent>
  );
};

export default PrintersAside;
