import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { usePrinterStore } from "@/store";

interface AlertDialogDeletePrinterProps {
  name: string;
}

const AlertDialogDeletePrinter = ({ name }: AlertDialogDeletePrinterProps) => {
  const { deletePrinter } = usePrinterStore();

  const handleDelete = () => {
    deletePrinter(name);
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>¿Estás seguro de eliminar {name}?</AlertDialogTitle>
        <AlertDialogDescription>
          Borraras los datos de conexión de esta Impresora Termal con esta
          computadora.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction className="hover:bg-red-500" onClick={handleDelete}>
          Sí, Eliminar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertDialogDeletePrinter;
