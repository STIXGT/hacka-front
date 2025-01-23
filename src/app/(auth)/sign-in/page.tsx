import SignInForm from "@/components/sign-in-form";
import { FileUserIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SignIn() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="bg-black z-50 rounded-xl p-2.5 flex items-center justify-center">
          <FileUserIcon className="text-white " size="25" />
        </div>
        <h1 className="text-white z-50 text-2xl font-bold">
          Bienvenido a HandDrop!
        </h1>
        <span className="text-white/50 z-50 flex gap-1">
          No tienes cuenta aún?
          <Link className="underline text-white/50 z-50" href="/sign-up">
            Regístrate!
          </Link>
        </span>
        <SignInForm />
      </div>
    </div>
  );
}
