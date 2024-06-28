"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const Navbar = () => {
  const { toast } = useToast();
  return (
    <nav className="h-14 bg-primary-dark flex justify-between items-center p-8">
      <Image
        src="/images/logos/logo_mexico.svg"
        width={128}
        height={48}
        alt="logo"
      />
      <Button
        className="bg-accent hover:bg-accent-light active:bg-accent-dark"
        onClick={() => {
          const { dismiss } = toast({
            title: "Toast",
            description: "Esto es una prueba",
          });

          setTimeout(() => {
            dismiss();
          }, 2000);
        }}
      >
        Toast
      </Button>
    </nav>
  );
};

export default Navbar;
