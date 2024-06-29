import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const PrintersAside = () => {
  return (
    <SheetContent className="w-full sm:!max-w-[350px] lg:!max-w-[500px]">
      <SheetHeader>
        <SheetTitle>Impresoras Disponibles</SheetTitle>
        <hr className="bg-secondary h-1" />
        <SheetDescription>
          Aquí puedes observar las impresoras termales que se encuentran
          conectadas a tu misma red.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default PrintersAside;
