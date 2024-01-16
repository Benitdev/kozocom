import Image from "next/image";
import AuthForm from "~/components/layout/auth-form";
import { Card } from "~/components/ui/card";

export default async function Signin() {
  return (
    <section className="container">
      <div className="flex min-h-[calc(100vh-184px)] items-center justify-center md:min-h-[calc(100vh-160px)]">
        <Card className="w-full max-w-[450px] border-slate-200/10 p-6 shadow-md">
          <h2 className="pb-2 text-center text-3xl font-semibold tracking-tight transition-colors">
            <Image
              src={"/custom-logo-company-white.png"}
              alt="logo"
              width={200}
              height={50}
              className="mx-auto"
            />
          </h2>
          <AuthForm />
        </Card>
      </div>
    </section>
  );
}
