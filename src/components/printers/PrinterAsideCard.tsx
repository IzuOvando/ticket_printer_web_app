import React from "react";
import { Printer } from "lucide-react";

const PrinterAsideCard = ({
  name,
  ip,
  online,
}: {
  name: string;
  ip: string;
  online: boolean;
}) => {
  return (
    <div className=" flex items-center flex-col rounded-md border p-4 w-full">
      <Printer
        size={90}
        strokeWidth={6}
        absoluteStrokeWidth
        color="rgb(var(--accent-dark-color))"
      />
      <div className="w-full flex flex-col items-center">
        <span className="font-bold text-xl text-center">{name}</span>
        <span className="font-medium text-lg text-gray-600">{ip}</span>
        {online ? (
          <span className="flex gap-2 justify-center items-center text-green-500 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-green-500" />
            Online
          </span>
        ) : (
          <span className="flex gap-2 justify-center items-center text-red-500 font-medium">
            <span className="flex h-2 w-2 rounded-full bg-red-500" />
            Offline
          </span>
        )}
      </div>
    </div>
  );
};

export default PrinterAsideCard;
