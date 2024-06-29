import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Printer } from "../types";

interface PrinterState {
  printers: Printer[];
  addPrinter: (printer: Printer) => void;
  deletePrinter: (name: string) => void;
  editPrinter: (name: string, newName: string, ip: string) => void;
}

export const usePrinterStore = create<PrinterState>()(
  persist(
    (set) => ({
      printers: [],
      addPrinter: (printer) =>
        set((state) => ({
          printers: [...state.printers, printer],
        })),
      deletePrinter: (name) =>
        set((state) => {
          return {
            printers: state.printers.filter((printer) => printer.name !== name),
          };
        }),
      editPrinter: (name, newName, ip) =>
        set((state) => {
          const printer = state.printers.find(
            (printer) => printer.name === name
          );
          if (!printer) return { printers: state.printers };

          const remainingPrinters = state.printers.filter(
            (printer) => printer.name !== name
          );

          const newPrinter: Printer = {
            name: newName,
            ip: ip,
            online: printer.online,
          };

          return {
            printers: [...remainingPrinters, newPrinter],
          };
        }),
    }),
    {
      name: "printers",
      version: 1,
      skipHydration: true,
    }
  )
);
