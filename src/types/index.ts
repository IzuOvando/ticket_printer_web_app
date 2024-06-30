import EpsonPrinter from "@/lib/epson";

export type Printer = {
  name: string;
  ip: string;
  status: "online" | "offline" | "connecting";
  device?: EpsonPrinter;
};
