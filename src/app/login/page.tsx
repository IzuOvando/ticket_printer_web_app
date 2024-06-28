import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <main className="container my-10">
      <h1 className="text-center text-4xl font-semibold">Iniciar Sesión</h1>
      <div className="w-full flex justify-center mt-6">
        <Card className="w-[350px]">
          <form>
            <CardHeader>
              <CardTitle>Ingresa Credenciales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Your Username" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="******" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                className="bg-secondary hover:bg-secondary-light active:bg-secondary-dark"
                size={"lg"}
                style={{ color: "white" }}
              >
                Entrar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
