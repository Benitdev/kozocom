import Image from "next/image";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Button } from "~/components/ui/ui-button";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  selected?: boolean;
};

export default function VoteItem({
  id,
  image,
  title,
  description,
  selected,
}: Props) {
  return (
    <Button
      as={"div"}
      className="border-slate-800/40 bg-slate-900/40"
      duration={4000}
      containerClassName="h-full"
    >
      <Card className="relative h-full w-full cursor-pointer border-none bg-transparent">
        <CardContent className="grid h-full grid-cols-3 gap-4 p-0">
          <div className="relative">
            <Image src={"/custom-logo-company-white.png"} alt={title} fill />
          </div>
          <div className="col-span-2 space-y-2 p-6">
            <h3 className="text-2xl font-extrabold text-blue-500">{title}</h3>
            <p className="text-xl font-bold uppercase text-slate-400">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>
      {selected && (
        <div className="absolute inset-0 rounded-[1.5rem] bg-blue-700/20"></div>
      )}
    </Button>
  );
}
