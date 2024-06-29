import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Printer } from "../types";

interface PrinterState {
  printers: Printer[];
  addPrinter: (name: string, ip: string) => void;
  deletePrinter: (name: string) => void;
  editPrinter: (name: string, newName: string, ip: string) => void;
  reconnectPrinters: () => void;
}

export const usePrinterStore = create<PrinterState>()(
  persist(
    (set) => ({
      printers: [],
      addPrinter: (name, ip) =>
        set((state) => ({
          printers: [
            ...state.printers,
            {
              name,
              ip,
              online: false,
            },
          ],
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
      reconnectPrinters: () =>
        set((state) => {
          console.log("Reconnect Printers...");
          const newPrinters = state.printers.map((print) => {
            return {
              ip: print.ip,
              name: print.name,
              online: print.online,
              device: "Recconected Printer",
            };
          });

          return {
            printers: newPrinters,
          };
        }),
    }),
    {
      name: "printers",
      version: 1,
      partialize: (state) => {
        return {
          printers: state.printers.map((printer) => {
            return {
              name: printer.name,
              ip: printer.ip,
              online: printer.online,
            };
          }),
        };
      },
    }
  )
);
