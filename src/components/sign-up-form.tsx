"use client";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { signup } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Correo invalido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener entre 8 y 15 caracteres.")
    .max(15, "La contraseña debe tener entre 8 y 15 caracteres."),
});

export default function SingUpForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signup(values);
      toast({
        title: "Registro",
        description: "Registro exitoso, revisa tu correo para confirmar.",
      });

      setTimeout(() => {
        router.push("/sign-in");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description:
          "No se pudo registrar. Por favor, verifica tus credenciales.",
      });
    }
  }
  return (
    <div className="w-96 flex flex-col space-y-4 z-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4  w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white  z-50">Correo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@test.com"
                    className="text-white"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Este sera tu correo electronico.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="pe-9 text-white"
                      placeholder="********"
                      type={isVisible ? "text" : "password"}
                    />
                    <button
                      className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                      type="button"
                      onClick={toggleVisibility}
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      aria-pressed={isVisible}
                      aria-controls="password"
                    >
                      {isVisible ? (
                        <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                      ) : (
                        <Eye size={16} strokeWidth={2} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormDescription>Esta sera tu contraseña.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrarse"
            )}
          </Button>
        </form>
      </Form>
      <div className="flex justify-center items-center w-full">
        <div className="flex items-center w-full">
          <div className="h-[1px] bg-gray-600 flex-grow"></div>

          <span className="mx-2 text-gray-500">O</span>

          <div className="h-[1px] bg-gray-600 flex-grow"></div>
        </div>
      </div>
      <Button className="w-full">Continuar con Google</Button>
    </div>
  );
}
