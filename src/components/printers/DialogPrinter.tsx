import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface DialogPrinterAddProps {
  mode: "add";
  newPrinterNumber: number;
}

interface DialogPrinterEditProps {
  mode: "edit";
  name: string;
  ip: string;
}

type DialogPrinterProps = DialogPrinterAddProps | DialogPrinterEditProps;

const DialogPrinter = (props: DialogPrinterProps) => {
  const title = props.mode === "add" ? "Agregar Impresora" : "Editar Impresora";
  const description =
    props.mode === "add"
      ? "Escribe un nombre para identificar la Impresora Termal y escribe la Dirección IP que se le fue asignada en tu red local (LAN)."
      : "Edita el nombre de la Impresora Termal y la Dirección IP que se le fue asignanda.";

  return (
    <DialogContent className="sm:max-w-[450px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nombre
          </Label>
          <Input
            id="name"
            defaultValue={
              props.mode === "add"
                ? `Impresora ${props.newPrinterNumber}`
                : props.name
            }
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="ip" className="text-right">
            Dirección IP
          </Label>
          <Input
            id="ip"
            placeholder="192.168.0.1"
            className="col-span-3"
            defaultValue={props.mode === "edit" ? props.ip : undefined}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Agregar</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DialogPrinter;
