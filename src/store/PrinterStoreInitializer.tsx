"use client";
import { useEffect } from "react";
import { usePrinterStore } from "./printerStore";

const PrinterStoreInitializer = () => {
  useEffect(() => {
    usePrinterStore.persist.rehydrate();
  }, []);

  return null;
};

export default PrinterStoreInitializer;
