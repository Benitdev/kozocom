"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import AuthForm from "./auth-form";
import Image from "next/image";

export default function SignInModal() {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="w-full max-w-[400px] rounded-md border-slate-900/40">
        <DialogHeader>
          <DialogTitle>
            <h2 className="font-semibold tracking-tight transition-colors">
              <Image
                src={"/custom-logo-company-white.png"}
                alt="logo"
                width={200}
                height={50}
                className="mx-auto"
              />
            </h2>
          </DialogTitle>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}
