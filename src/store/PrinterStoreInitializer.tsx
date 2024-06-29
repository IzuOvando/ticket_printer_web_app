"use client";
import { use, useEffect, useState } from "react";
import { usePrinterStore } from "./printerStore";

const PrinterStoreInitializer = () => {
  const [hydrated, setHydrated] = useState(false);
  const { reconnectPrinters } = usePrinterStore();

  useEffect(() => {
    usePrinterStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) reconnectPrinters();
  }, [hydrated, reconnectPrinters]);

  return null;
};

export default PrinterStoreInitializer;
